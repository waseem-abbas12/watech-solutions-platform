/**
 * Watech Solutions Admin Formatting Utilities
 * Handles Pakistani Rupee (PKR) Lakhs/Crores, dates, and status styling
 */

export function formatPKR(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) return "PKR 0";

  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `PKR ${crore % 1 === 0 ? crore : crore.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lac = amount / 100000;
    return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
  }
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function formatNumber(num: number): string {
  if (typeof num !== "number" || isNaN(num)) return "0";
  return num.toLocaleString("en-PK");
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export function getStockStatus(stock: number): {
  label: string;
  badgeClass: string;
  isLow: boolean;
  isCritical: boolean;
} {
  if (stock <= 0) {
    return {
      label: "Out of Stock",
      badgeClass: "bg-red-500/10 text-red-400 border border-red-500/30",
      isLow: true,
      isCritical: true,
    };
  }
  if (stock < 5) {
    return {
      label: `Low Stock (${stock})`,
      badgeClass: "bg-rose-600/20 text-rose-400 border border-rose-500/40 animate-pulse font-bold",
      isLow: true,
      isCritical: true,
    };
  }
  if (stock < 10) {
    return {
      label: `Warning (${stock})`,
      badgeClass: "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold",
      isLow: true,
      isCritical: false,
    };
  }
  return {
    label: `In Stock (${stock})`,
    badgeClass: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    isLow: false,
    isCritical: false,
  };
}
