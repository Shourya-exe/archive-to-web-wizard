import { describe, expect, it } from "vitest";

import { SERVICE_BY_ID } from "@/lib/catalog";
import { cartTotal, isValidMobile, isWestBengalPincode } from "@/lib/pricing";

describe("cart total", () => {
  it("multiplies each service price by its quantity and adds them up", () => {
    const prices = { a: { price: 699 }, b: { price: 599 } };
    expect(cartTotal([{ id: "a", qty: 1 }, { id: "b", qty: 2 }], prices)).toBe(1897);
  });

  it("ignores services that are not in the catalog", () => {
    expect(cartTotal([{ id: "missing", qty: 3 }, { id: "bathroom-deep-clean", qty: 1 }], SERVICE_BY_ID)).toBe(
      SERVICE_BY_ID["bathroom-deep-clean"]?.price,
    );
  });
});

describe("checkout validation", () => {
  it("accepts 10-digit Indian mobiles starting 6-9 only", () => {
    expect(isValidMobile("9830012345")).toBe(true);
    expect(isValidMobile("5830012345")).toBe(false);
    expect(isValidMobile("983001234")).toBe(false);
  });

  it("accepts West Bengal pincodes 700000–743999 only", () => {
    expect(isWestBengalPincode("700091")).toBe(true);
    expect(isWestBengalPincode("743999")).toBe(true);
    expect(isWestBengalPincode("744001")).toBe(false);
    expect(isWestBengalPincode("110001")).toBe(false);
  });
});
