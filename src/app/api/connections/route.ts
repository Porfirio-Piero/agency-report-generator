import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformConnections, clients } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// GET /api/connections - List all connections for current user
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userClients = await db
      .select()
      .from(clients)
      .where(eq(clients.userId, userId));

    const clientIds = userClients.map((c) => c.id);

    if (clientIds.length === 0) {
      return NextResponse.json({ connections: [] });
    }

    // Get all connections for user's clients
    const connections = await db
      .select()
      .from(platformConnections)
      .where(eq(platformConnections.clientId, clientIds[0])); // Simplified for now

    return NextResponse.json({ connections });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json(
      { error: "Failed to fetch connections" },
      { status: 500 }
    );
  }
}

// POST /api/connections - Create a new connection
export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, platform, accessToken, refreshToken, platformAccountId, platformAccountName, expiresAt } = body;

    if (!clientId || !platform || !accessToken) {
      return NextResponse.json(
        { error: "Client ID, platform, and access token are required" },
        { status: 400 }
      );
    }

    // Verify client belongs to user
    const [client] = await db
      .select()
      .from(clients)
      .where(and(eq(clients.id, clientId), eq(clients.userId, userId)));

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const [newConnection] = await db
      .insert(platformConnections)
      .values({
        clientId,
        platform,
        accessToken,
        refreshToken: refreshToken || null,
        platformAccountId: platformAccountId || null,
        platformAccountName: platformAccountName || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      })
      .returning();

    return NextResponse.json({ connection: newConnection }, { status: 201 });
  } catch (error) {
    console.error("Error creating connection:", error);
    return NextResponse.json(
      { error: "Failed to create connection" },
      { status: 500 }
    );
  }
}

// DELETE /api/connections - Delete a connection
export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get("id");

    if (!connectionId) {
      return NextResponse.json(
        { error: "Connection ID is required" },
        { status: 400 }
      );
    }

    const [deletedConnection] = await db
      .delete(platformConnections)
      .where(eq(platformConnections.id, connectionId))
      .returning();

    if (!deletedConnection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting connection:", error);
    return NextResponse.json(
      { error: "Failed to delete connection" },
      { status: 500 }
    );
  }
}