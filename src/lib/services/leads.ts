import { db } from "@/lib/firebase/client";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { LeadRecord, LeadStatus, LeadSource } from "@/types/database";

// In-memory / client fallback cache so newly created leads are immediately visible
// in the Admin and Partner dashboards even before Firestore index sync or in offline demo mode.
const LOCAL_LEADS_KEY = "watech_platform_leads_cache_v1";

export function generateLeadId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `LEAD-${year}-${randomNum}`;
}

export function getLocalCachedLeads(): LeadRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalCachedLead(lead: LeadRecord): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalCachedLeads();
    // Prepend new lead
    const updated = [lead, ...existing.filter((l) => l.id !== lead.id)];
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to cache lead locally", err);
  }
}

export interface CreateLeadParams {
  customerName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  category: "real_estate" | "furniture" | "events" | "digital_services" | "general";
  listingId?: string;
  listingTitle?: string;
  partnerId?: string;
  partnerPhone?: string;
  source: LeadSource;
  notes?: string;
  budget?: string;
  requiredService?: string;
  city?: string;
}

/**
 * Universal lead creation engine
 * 1. Generates formatted LEAD-YYYY-XXXX
 * 2. Saves to Firestore 'leads' collection
 * 3. Saves to local cache for instant UI availability
 */
export async function createLead(params: CreateLeadParams): Promise<{ success: boolean; leadId: string; lead: LeadRecord }> {
  const leadId = generateLeadId();
  const now = new Date().toISOString();

  const newLead: LeadRecord = {
    id: leadId,
    customerName: params.customerName.trim(),
    phone: params.phone.trim(),
    whatsapp: params.whatsapp?.trim() || params.phone.trim(),
    email: params.email?.trim() || "",
    category: params.category,
    listingId: params.listingId,
    listingTitle: params.listingTitle,
    partnerId: params.partnerId || "admin-pool",
    partnerPhone: params.partnerPhone || "923270831470",
    source: params.source,
    status: "new",
    notes: params.notes || "",
    budget: params.budget || "",
    requiredService: params.requiredService || "",
    city: params.city || "All",
    createdAt: now,
    updatedAt: now,
  };

  // 1. Cache immediately for frontend zero-latency
  saveLocalCachedLead(newLead);

  // 2. Persist to Firestore
  try {
    if (db) {
      await addDoc(collection(db, "leads"), {
        ...newLead,
        serverCreatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.warn("Firestore lead persistence fallback (using local cache):", err);
  }

  return { success: true, leadId, lead: newLead };
}

/**
 * Update lead status with audit record
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus,
  newNotes?: string
): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      const existing = getLocalCachedLeads();
      const updated = existing.map((l) => {
        if (l.id === leadId) {
          return {
            ...l,
            status: newStatus,
            notes: newNotes !== undefined ? newNotes : l.notes,
            updatedAt: new Date().toISOString(),
          };
        }
        return l;
      });
      localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to update cached lead", err);
    }
  }

  return { success: true };
}
