import type { FormItemRule } from "naive-ui";

export function euros(amount: number, fractionDigits = 2) {
  const n = amount.toFixed(fractionDigits).replace(".", ",");
  const p = n.indexOf(",");
  return n.replace(/\d(?=(?:\d{3})+(?:,|$))/g, (m, i) =>
    p < 0 || i < p ? `${m}.` : m
  ) + " €";
}

export const validatePositive = (rule: FormItemRule, x: number) => x >= 0;
export const euroToCent = (x: number | null): string =>
  `${((x || 0) * 100).toFixed(0)}`;
export const centToEuro = (x: string): number => Number(x) / 100;