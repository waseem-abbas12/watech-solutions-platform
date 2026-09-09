import { NextRequest, NextResponse } from "next/server";
import {
  INITIAL_PROPERTIES,
  INITIAL_FURNITURE,
  INITIAL_EVENTS,
} from "@/lib/mock-data";

export interface ChatRecommendation {
  id: string;
  title: string;
  category: "properties" | "furniture" | "events" | "food-catering";
  price: string;
  detail: string;
  image: string;
  link: string;
}

function formatPKR(num: number): string {
  if (num >= 10000000) {
    const crore = num / 10000000;
    return `PKR ${crore % 1 === 0 ? crore : crore.toFixed(2)} Crore`;
  }
  if (num >= 100000) {
    const lac = num / 100000;
    return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
  }
  return `PKR ${num.toLocaleString()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.message || "").trim().toLowerCase();

    if (!query) {
      return NextResponse.json({
        reply: "Assalam-o-Alaikum! Main Watech AI Assistant hoon. Main Real Estate plots, Chinioti furniture aur Food & Catering mein aapki rehnumai kar sakta hoon. Aap kis cheez ke mutalliq daryaft karna chahte hain?",
        recommendations: [],
      });
    }

    const recommendations: ChatRecommendation[] = [];
    let reply = "";

    // 1. Check for Human Agent / Contact / Help
    if (
      query.includes("human") ||
      query.includes("agent") ||
      query.includes("waseem") ||
      query.includes("contact") ||
      query.includes("phone") ||
      query.includes("number") ||
      query.includes("call") ||
      query.includes("rabta")
    ) {
      reply =
        "Ji bilkul! Hamare senior sales advisor Janab Waseem Abbas direct WhatsApp par dastiyab hain (0327-0831470). Aap neeche diye gaye button par click karke direct WhatsApp chat shuru kar sakte hain.";
      return NextResponse.json({ reply, recommendations, directAgent: true });
    }

    // 2. Real Estate / Property Intent
    const isProperty =
      query.includes("plot") ||
      query.includes("house") ||
      query.includes("ghar") ||
      query.includes("villa") ||
      query.includes("property") ||
      query.includes("real estate") ||
      query.includes("dha") ||
      query.includes("bahria") ||
      query.includes("kanal") ||
      query.includes("marla") ||
      query.includes("zameen");

    // 3. Furniture Intent
    const isFurniture =
      query.includes("furniture") ||
      query.includes("sofa") ||
      query.includes("bed") ||
      query.includes("dining") ||
      query.includes("wood") ||
      query.includes("chiniot") ||
      query.includes("sheesham") ||
      query.includes("teak") ||
      query.includes("lakri");

    // 4. Food & Catering Intent
    const isFood =
      query.includes("event") ||
      query.includes("food") ||
      query.includes("catering") ||
      query.includes("pakwan") ||
      query.includes("bbq") ||
      query.includes("restaurant") ||
      query.includes("biryani") ||
      query.includes("nihari") ||
      query.includes("bakery") ||
      query.includes("sweets") ||
      query.includes("daawat") ||
      query.includes("deg") ||
      query.includes("hall") ||
      query.includes("marquee") ||
      query.includes("banquet") ||
      query.includes("shadi") ||
      query.includes("wedding") ||
      query.includes("menu") ||
      query.includes("venue");

    if (isProperty) {
      // Find matching properties
      const matched = INITIAL_PROPERTIES.filter((p) => {
        if (query.includes("lahore") && p.city.toLowerCase() !== "lahore") return false;
        if (query.includes("islamabad") && p.city.toLowerCase() !== "islamabad") return false;
        if (query.includes("plot") && p.type !== "Plot") return false;
        if (query.includes("villa") || query.includes("house") || query.includes("ghar")) {
          if (p.type !== "House") return false;
        }
        return true;
      }).slice(0, 3);

      const itemsToUse = matched.length > 0 ? matched : INITIAL_PROPERTIES.slice(0, 3);

      itemsToUse.forEach((p) => {
        recommendations.push({
          id: p.id,
          title: p.title,
          category: "properties",
          price: formatPKR(p.price),
          detail: `${p.city} · ${p.area} · ${p.type}`,
          image: p.image,
          link: `/marketplace/properties/${p.id}`,
        });
      });

      reply = `Yeh lijiye! Hamare verified Real Estate listings mein se behtareen options aapke liye dhoonde gaye hain. Tamam properties direct seller aur legal verification ke sath dastiyab hain. Mazeed detail ke liye kisi bhi option par click karein:`;
    } else if (isFurniture) {
      // Find matching furniture
      const matched = INITIAL_FURNITURE.filter((f) => {
        if (query.includes("sofa") && f.category !== "Sofa") return false;
        if (query.includes("bed") && f.category !== "Bed") return false;
        if (query.includes("dining") && f.category !== "Dining") return false;
        if (query.includes("sheesham") && f.woodType !== "Sheesham") return false;
        return true;
      }).slice(0, 3);

      const itemsToUse = matched.length > 0 ? matched : INITIAL_FURNITURE.slice(0, 3);

      itemsToUse.forEach((f) => {
        recommendations.push({
          id: f.id,
          title: f.name,
          category: "furniture",
          price: formatPKR(f.price),
          detail: `Pure ${f.woodType} Wood · 10-Yr Warranty · Chiniot Handcraft`,
          image: f.image,
          link: `/marketplace/furniture/${f.id}`,
        });
      });

      reply = `Chinioti woodwork mein yeh hamare top-rated luxury pieces hain. Har item pure Sheesham ya Burma Teak wood aur master hand-carving ke sath banaya gaya hai:`;
    } else if (isFood) {
      // Find matching food & catering
      const matched = INITIAL_EVENTS.filter((e) => {
        if (query.includes("lahore") && e.city.toLowerCase() !== "lahore") return false;
        if (query.includes("islamabad") && e.city.toLowerCase() !== "islamabad") return false;
        return true;
      }).slice(0, 3);

      const itemsToUse = matched.length > 0 ? matched : INITIAL_EVENTS.slice(0, 3);

      itemsToUse.forEach((e) => {
        recommendations.push({
          id: e.id,
          title: e.title,
          category: "food-catering",
          price: `PKR ${e.packagePrice.toLocaleString()} / head`,
          detail: `${e.city} · Up to ${e.capacity} Guests · ${e.menuType} Menu`,
          image: e.image,
          link: `/marketplace/food-catering/${e.id}`,
        });
      });

      reply = `Dawat, Shadi, Catering aur Restaurant services ke liye hamare verified Food & Catering options yeh hain:`;
    } else {
      // Generic helpful response with cross-sector highlight
      const topProp = INITIAL_PROPERTIES[0];
      const topFurn = INITIAL_FURNITURE[0];
      const topEvent = INITIAL_EVENTS[0];

      recommendations.push(
        {
          id: topProp.id,
          title: topProp.title,
          category: "properties",
          price: formatPKR(topProp.price),
          detail: `${topProp.city} · ${topProp.type}`,
          image: topProp.image,
          link: `/marketplace/properties/${topProp.id}`,
        },
        {
          id: topFurn.id,
          title: topFurn.name,
          category: "furniture",
          price: formatPKR(topFurn.price),
          detail: `Pure ${topFurn.woodType} Wood`,
          image: topFurn.image,
          link: `/marketplace/furniture/${topFurn.id}`,
        },
        {
          id: topEvent.id,
          title: topEvent.title,
          category: "food-catering",
          price: `PKR ${topEvent.packagePrice.toLocaleString()} / head`,
          detail: `${topEvent.city} · ${topEvent.menuType}`,
          image: topEvent.image,
          link: `/marketplace/food-catering/${topEvent.id}`,
        }
      );

      reply = `Assalam-o-Alaikum! Watech multi-sector ecosystem mein aapka khush-amdeed. Main aapko Real Estate plots/villas, Chinioti handcrafted furniture, aur Food & Catering ke hawalay se exact rate aur inventory bata sakta hoon. Aap kis cheez ki talash mein hain?`;
    }

    return NextResponse.json({
      reply,
      recommendations,
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      {
        reply: "Shukriya aapke rabte ka! System is waqt connect ho raha hai. Aap direct hamare WhatsApp (0327-0831470) par bhi rabta kar sakte hain.",
        recommendations: [],
      },
      { status: 200 }
    );
  }
}
