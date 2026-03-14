import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, reportMetrics, clients, platformConnections } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

// GET /api/reports - List all reports
export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status");

    // Get user's clients
    const userClients = await db
      .select()
      .from(clients)
      .where(eq(clients.userId, userId));

    const clientIds = userClients.map((c) => c.id);

    if (clientIds.length === 0) {
      return NextResponse.json({ reports: [] });
    }

    // Build query
    let query = db
      .select()
      .from(reports)
      .where(eq(reports.clientId, clientIds[0]));

    // Filter by client if provided
    if (clientId) {
      query = db
        .select()
        .from(reports)
        .where(eq(reports.clientId, clientId));
    }

    const userReports = await query.orderBy(desc(reports.createdAt));

    // Get metrics for each report
    const reportsWithMetrics = await Promise.all(
      userReports.map(async (report) => {
        const metrics = await db
          .select()
          .from(reportMetrics)
          .where(eq(reportMetrics.reportId, report.id));

        return {
          ...report,
          metrics: metrics,
        };
      })
    );

    return NextResponse.json({ reports: reportsWithMetrics });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

// POST /api/reports - Generate a new report
export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, weekStart, weekEnd } = body;

    // Verify client belongs to user
    const [client] = await db
      .select()
      .from(clients)
      .where(and(eq(clients.id, clientId), eq(clients.userId, userId)));

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Get connections for client
    const connections = await db
      .select()
      .from(platformConnections)
      .where(eq(platformConnections.clientId, clientId));

    if (connections.length === 0) {
      return NextResponse.json(
        { error: "No platform connections found for client" },
        { status: 400 }
      );
    }

    // Create report
    const [newReport] = await db
      .insert(reports)
      .values({
        clientId,
        weekStart: new Date(weekStart),
        weekEnd: new Date(weekEnd),
        status: "pending",
      })
      .returning();

    // For each connection, fetch metrics from platform
    for (const connection of connections) {
      try {
        // Mock metrics for now - in production, fetch from actual APIs
        const metrics = await fetchMetricsFromPlatform(connection);

        await db.insert(reportMetrics).values({
          reportId: newReport.id,
          platform: connection.platform,
          ...metrics,
        });
      } catch (error) {
        console.error(`Error fetching metrics for ${connection.platform}:`, error);
        // Continue with other platforms even if one fails
      }
    }

    // Update report status
    await db
      .update(reports)
      .set({ status: "generated" })
      .where(eq(reports.id, newReport.id));

    return NextResponse.json({ report: newReport }, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}

// Mock function - replace with actual API calls
async function fetchMetricsFromPlatform(connection: any) {
  // In production, use connection.accessToken to call platform APIs:
  // - Google Analytics: https://www.googleapis.com/analytics/v3/data/ga
  // - Facebook Ads: https://graph.facebook.com/v18.0/act_{account_id}/insights
  // - LinkedIn Ads: https://api.linkedin.com/v2/adAnalyticsV2

  return {
    impressions: String(Math.floor(Math.random() * 100000) + 10000),
    clicks: String(Math.floor(Math.random() * 10000) + 1000),
    conversions: String(Math.floor(Math.random() * 500) + 50),
    spend: `$${(Math.random() * 5000 + 500).toFixed(2)}`,
    revenue: `$${(Math.random() * 50000 + 5000).toFixed(2)}`,
    ctr: `${(Math.random() * 10 + 1).toFixed(2)}%`,
    cpc: `$${(Math.random() * 5 + 0.5).toFixed(2)}`,
    roas: `${(Math.random() * 5 + 1).toFixed(2)}x`,
  };
}