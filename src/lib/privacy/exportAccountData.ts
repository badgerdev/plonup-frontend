// src/lib/privacy/exportAccountData.ts

export async function exportAccountData() {
  const res = await fetch("/api/account/export");

  if (!res.ok) {
    throw new Error("Export failed");
  }

  const data = await res.json();

  const date = new Date().toISOString().split("T")[0];
  const filename = `plonup-account-export-${date}.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  a.remove();
  URL.revokeObjectURL(url);
}
