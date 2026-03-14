import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { platformConnections } from "@/lib/db/schema";

const oauthConfigs = {
  google_analytics: {
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  facebook_ads: {
    tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
    clientId: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
  linkedin_ads: {
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  },
};

type Params = Promise<{ platform: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { platform } = await params;
  const config = oauthConfigs[platform as keyof typeof oauthConfigs];

  if (!config) {
    return NextResponse.redirect(
      new URL("/clients?error=invalid_platform", request.url)
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(
      new URL("/clients?error=no_code", request.url)
    );
  }

  // Exchange code for tokens
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/${platform}/callback`;
  
  try {
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: config.clientId!,
        client_secret: config.clientSecret!,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text());
      return NextResponse.redirect(
        new URL("/clients?error=token_exchange_failed", request.url)
      );
    }

    const tokenData = await tokenResponse.json();

    // Parse state to get clientId
    let stateData: { clientId: string };
    try {
      stateData = JSON.parse(Buffer.from(state || "", "base64").toString());
    } catch {
      stateData = { clientId: "" };
    }

    // Store connection in database
    const [connection] = await db
      .insert(platformConnections)
      .values({
        clientId: stateData.clientId || "unknown",
        platform: platform,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || null,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : null,
      })
      .returning();

    // Redirect back to clients page with success
    return NextResponse.redirect(
      new URL(`/clients?success=connected&platform=${platform}`, request.url)
    );
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/clients?error=unknown_error", request.url)
    );
  }
}