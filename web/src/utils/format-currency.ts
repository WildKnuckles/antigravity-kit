export function parseCurrency(value: string): number {
  const numericValue = value.replace(/\D/g, "");
  return numericValue ? parseFloat(numericValue) / 100 : 0;
}

export function formatCurrency(value: string | number): string {
  if (!value) return "";
  const number =
    typeof value === "number" ? value : parseCurrency(value.toString());
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)+ " Kz";
}