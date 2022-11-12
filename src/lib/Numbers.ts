export function euros(amount: number, fractionDigits = 2) {
  return (amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    style: "currency",
    currency: "EUR",
  });
}
