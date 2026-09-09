import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Meta WhatsApp Cloud API Webhook Handler
 * Supports:
 * 1. GET: Webhook verification challenge handshake (hub.verify_token, hub.challenge)
 * 2. POST: Inbound message forwarding to self-hosted n8n instance + Firestore sync
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
    const n8nWebhookUrl = process.env.N8N_WHATSAPP_WEBHOOK_URL;

    const messageObj = payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const fromPhone = messageObj?.from;
    const userText = (messageObj?.text?.body || "").toLowerCase();

    // 1. Record inbound inquiry in Firestore
    if (fromPhone && userText && db) {
      try {
        const cat =
          userText.includes("property") || userText.includes("plot") || userText.includes("house")
            ? "property"
            : userText.includes("furniture") || userText.includes("sofa") || userText.includes("bed")
            ? "furniture"
            : "food-catering";

        await addDoc(collection(db, "inquiries"), {
          customerName: `WhatsApp (+${fromPhone})`,
          customerPhone: fromPhone,
          customerEmail: "",
          serviceRequired: `WhatsApp Inbound: "${userText.slice(0, 40)}"`,
          message: userText,
          category: cat,
          status: "new",
          source: "whatsapp_cloud_api",
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn("Firestore WhatsApp inbound recording fallback:", err);
      }
    }

    // 2. Asynchronously forward to n8n workflow if configured
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("Error forwarding to n8n:", err));
    } else {
      // Autonomous Fallback: If Meta WhatsApp token is provided, reply directly
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

      if (accessToken && phoneNumberId && fromPhone) {
        let replyText =
          "Assalam-o-Alaikum! Watech Multi-Sector Platform mein khush-amdeed.\n\n• Real Estate Plots & Villas ke liye 'Property' likhein.\n• Chinioti Sheesham Wood Furniture ke liye 'Furniture' likhein.\n• Food & Catering Services ke liye 'Food' likhein.\n\nDirect contact: 0327-0831470";

        if (userText.includes("property") || userText.includes("plot") || userText.includes("villa") || userText.includes("house")) {
          replyText =
            "🏡 Watech Verified Real Estate:\n• 1 Kanal Luxury Villa DHA Ph 6 Lahore (PKR 8.5 Crore)\n• 10 Marla Brand New House Bahria Town (PKR 4.2 Crore)\n• 5 Marla Plot Bahria Ph 8 (PKR 95 Lac)\n\nInquire online: https://watech-solutions.vercel.app/marketplace/properties";
        } else if (userText.includes("furniture") || userText.includes("sofa") || userText.includes("bed") || userText.includes("wood")) {
          replyText =
            "🪑 Watech Chinioti Handcrafted Furniture:\n• Maharaja Royal Bed Set (Pure Sheesham) - PKR 345,000\n• Hand-Carved 7-Seater Sofa - PKR 285,000\n• 8-Seater Solid Teak Dining Suite - PKR 395,000\n\n10-Year Warranty. Browse: https://watech-solutions.vercel.app/marketplace/furniture";
        } else if (userText.includes("food") || userText.includes("catering") || userText.includes("pakwan") || userText.includes("event") || userText.includes("hall") || userText.includes("banquet") || userText.includes("bbq")) {
          replyText =
            "🍲 Watech Food & Catering Services:\n• Shahi Daawat Pakwan & Catering (Lahore) - PKR 1,850/head\n• Dera Shinwari Live BBQ & Karahi (Islamabad) - PKR 2,200/head\n• Clifton Royal Caterers & Biryani (Karachi) - PKR 1,650/head\n\nBook online: https://watech-solutions.vercel.app/marketplace/food-catering";
        }

        fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: fromPhone,
            type: "text",
            text: { body: replyText },
          }),
        }).catch((err) => console.error("Error sending direct Meta WhatsApp reply:", err));
      }
    }

    // Always respond 200 OK to Meta within 3 seconds to avoid webhook disablement
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (error) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
