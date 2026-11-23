export type CartLine = { id: string; qty: number };

/** Total in ₹ for cart lines, priced from the catalog. Unknown ids and non-positive qty are ignored. */
export function cartTotal(lines: CartLine[], prices: Record<string, { price: number }>): number {
  return lines.reduce((sum, l) => {
    const item = prices[l.id];
    if (!item || l.qty <= 0) return sum;
    return sum + item.price * l.qty;
  }, 0);
}

/** Valid Indian mobile: 10 digits starting 6–9. */
export function isValidMobile(v: string) {
  return /^[6-9]\d{9}$/.test(v.trim());
}

/** West Bengal pincodes run 700000–743999 (per the booking form hint). */
export function isWestBengalPincode(v: string) {
  if (!/^\d{6}$/.test(v.trim())) return false;
  const n = Number(v);
  return n >= 700000 && n <= 743999;
}
