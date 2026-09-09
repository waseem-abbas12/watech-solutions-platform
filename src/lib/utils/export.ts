/**
 * Watech Solutions Admin Export Utilities
 * Allows instant CSV download and formatted Print/PDF generation
 */

export function exportToCSV<T extends Record<string, unknown>>(
  filename: string,
  rows: T[],
  headers?: { key: keyof T; label: string }[]
): void {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  const columns = headers || Object.keys(rows[0]).map((key) => ({
    key: key as keyof T,
    label: key,
  }));

  const csvRows: string[] = [];

  // Header row
  csvRows.push(columns.map((col) => `"${col.label.replace(/"/g, '""')}"`).join(","));

  // Data rows
  for (const row of rows) {
    const values = columns.map((col) => {
      const val = row[col.key];
      if (val === null || val === undefined) return '""';
      if (typeof val === "object") return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvRows.join("\r\n"));
  const link = document.createElement("a");
  link.setAttribute("href", csvString);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printOrExportPDF(title: string): void {
  if (typeof window !== "undefined") {
    const originalTitle = document.title;
    document.title = `${title} - Watech Solutions`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
}
