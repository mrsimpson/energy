export function euros(amount: number, fractionDigits = 2) {
  const n = amount.toFixed(fractionDigits).replace(".", ",");
  const p = n.indexOf(",");
  return n.replace(/\d(?=(?:\d{3})+(?:,|$))/g, (m, i) =>
    p < 0 || i < p ? `${m}.` : m
  ) + " €";
}
