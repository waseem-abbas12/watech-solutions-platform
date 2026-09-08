import { NextRequest, NextResponse } from "next/server";

/**
 * Meta WhatsApp Cloud API Webhook Handler
 * Supports:
 * 1. GET: Webhook verification challenge handshake (hub.verify_token, hub.challenge)
 * 2. POST: Inbound message forwarding to self-hosted n8n instance
 */

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "watech_secure_verify_token_2026";

  // Check if mode and token match
  if (mode === "subscribe" && token === verifyToken) {
    console.log("WhatsApp Webhook verified successfully by Meta!");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Verification token mismatch", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Check if n8n webhook URL is configured
    const n8nWebhookUrl = process.env.N8N_WHATSAPP_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      // Asynchronously forward to n8n workflow
      fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("Error forwarding to n8n:", err));
    }

    // Always respond 200 OK to Meta within 3 seconds to avoid webhook disablement
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (error) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
