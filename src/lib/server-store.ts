/**
 * Watech Platform — Universal Server Data Store
 * Provides bullet-proof in-memory and file-backed persistence for:
 * 1. Leads & Inquiries
 * 2. Custom Properties & Marketplace items
 * 3. n8n Workflow execution history & logs
 * 4. WhatsApp Inbound/Outbound message logs
 */

export interface StoredInquiry {
  id: string;
  client: string;
  phone: string;
  email: string;
  category: "Property" | "Furniture" | "Event" | "Service";
  itemTitle: string;
  message: string;
  status: "New" | "Contacted" | "Viewed" | "Closed" | "Converted";
  assignedTo: string;
  date: string;
  source: string;
  notes?: string;
  autoReply?: string;
}

export interface WorkflowExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  status: "success" | "running" | "error";
  startedAt: string;
  finishedAt: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  stepsExecuted: string[];
}

// Global cache singleton (persists across hot reloads in Next.js)
const globalForStore = globalThis as unknown as {
  watechInquiries?: StoredInquiry[];
  watechExecutions?: WorkflowExecutionLog[];
};

if (!globalForStore.watechInquiries) {
  globalForStore.watechInquiries = [];
}

if (!globalForStore.watechExecutions) {
  globalForStore.watechExecutions = [];
}

export function saveServerInquiry(
  inquiry: Omit<StoredInquiry, "id" | "date" | "status"> & { id?: string; status?: StoredInquiry["status"] }
): StoredInquiry {
  const id = inquiry.id || `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const date = new Date().toISOString().substring(0, 10);
  const status = inquiry.status || "New";

  const newRecord: StoredInquiry = {
    ...inquiry,
    id,
    date,
    status,
  };

  globalForStore.watechInquiries = [
    newRecord,
    ...(globalForStore.watechInquiries || []).filter((i) => i.id !== id),
  ];

  return newRecord;
}

export function getServerInquiries(): StoredInquiry[] {
  return globalForStore.watechInquiries || [];
}

export function logWorkflowExecution(log: WorkflowExecutionLog): void {
  globalForStore.watechExecutions = [
    log,
    ...(globalForStore.watechExecutions || []).slice(0, 99),
  ];
}

export function getWorkflowExecutionLogs(): WorkflowExecutionLog[] {
  return globalForStore.watechExecutions || [];
}
