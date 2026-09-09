import { NextRequest, NextResponse } from "next/server";
import { getServerInquiries, saveServerInquiry } from "@/lib/server-store";
import { INITIAL_INQUIRIES } from "@/lib/firebase/admin-service";

export async function GET(req: NextRequest) {
  try {
    const serverInquiries = getServerInquiries();
    const serverIds = new Set(serverInquiries.map((i) => i.id));
    const merged = [...serverInquiries, ...INITIAL_INQUIRIES.filter((i) => !serverIds.has(i.id))];

    return NextResponse.json({
      success: true,
      count: merged.length,
      serverInquiriesCount: serverInquiries.length,
      inquiries: merged,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to retrieve inquiries",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newInquiry = saveServerInquiry({
      client: body.client || body.name || "Customer",
      phone: body.phone || "03270831470",
      email: body.email || "",
      category: body.category || "Property",
      itemTitle: body.itemTitle || body.serviceRequired || "General Inquiry",
      message: body.message || "",
      status: body.status || "New",
      assignedTo: body.assignedTo || "Operations Admin",
      source: body.source || "api_post",
    });

    return NextResponse.json({
      success: true,
      inquiry: newInquiry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save inquiry",
      },
      { status: 500 }
    );
  }
}
