export const exportToCSV = (data, filename = "data.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((h) => obj[h]));

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};