import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "@/constants/priceSetting";

export interface CouponApplied {
  coupon: Coupon;
  discountItem: number; // 상품 가격에서 깎인 금액
  discountShipping: number; // 배송비에서 깎인 금액
}

export interface CouponApplyResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
  appliedCoupons: CouponApplied[];
}

interface Props {
  coupons?: Coupon[];
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean; // 제주·도서산간 여부 (추가 배송비 3,000원)
}

const getCartTotal = (items: CartItem[]) =>
  items.reduce((t, i) => t + i.product.price * i.quantity, 0);

const getBaseShipping = (orderTotal: number, isIsland = false) => {
  let fee = orderTotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  if (isIsland) fee += 3000;
  return fee;
};

const inTimeRange = (now: Date, range: { start: string; end: string }) => {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= toMin(range.start) && cur <= toMin(range.end);
};

const bogoDiscount = (coupon: Coupon, items: CartItem[]) => {
  const buy = coupon.buyQuantity ?? 0;
  const get = coupon.getQuantity ?? 0;
  if (!buy || !get) return 0;
  let best = 0;
  // "동일 상품 N개 구매 시 M개 무료" → N개마다 M개 할인
  for (const it of items) {
    const groups = Math.floor(it.quantity / buy); // 3개마다 1개 무료라면 buy=3
    const discount = groups * get * it.product.price;
    if (discount > best) best = discount; // 단가가 가장 높은 상품만 적용
  }
  return best;
};

const calcDiscount = (
  coupon: Coupon,
  items: CartItem[],
  orderTotal: number,
  shipFee: number,
  now = new Date()
) => {
  if (coupon.expirationDate && now > coupon.expirationDate) return null;
  if (coupon.minimumAmount && orderTotal < coupon.minimumAmount) return null;
  if (coupon.availableTime && !inTimeRange(now, coupon.availableTime))
    return null;

  let item = 0;
  let shipping = 0;
  if (coupon.discountType === "fixed") item = coupon.discount ?? 0;
  if (coupon.discountType === "percentage")
    item = Math.floor(orderTotal * ((coupon.discount ?? 0) / 100));
  if (coupon.discountType === "buyXgetY") item = bogoDiscount(coupon, items);
  if (coupon.discountType === "freeShipping") shipping = shipFee; // 전체 배송비 면제(도서산간 포함)

  if (!item && !shipping) return null;
  return {
    coupon,
    discountItem: item,
    discountShipping: shipping,
  } as CouponApplied;
};

const chooseBestCombo = (
  candidates: CouponApplied[],
  shipFee: number,
  orderTotal: number
) => {
  let best: CouponApplied[] = [];
  let maxSave = 0;

  for (let i = 0; i < candidates.length; i++) {
    const c1 = candidates[i];
    // 단일 쿠폰
    const saveSingle = c1.discountItem + c1.discountShipping;
    if (saveSingle > maxSave) {
      maxSave = saveSingle;
      best = [c1];
    }
    // 두 장 조합
    for (let j = i + 1; j < candidates.length; j++) {
      const c2 = candidates[j];
      const save = saveSingle + c2.discountItem + c2.discountShipping;
      if (save > maxSave) {
        maxSave = save;
        best = [c1, c2];
      }
    }
  }

  const discountItems = best.reduce((s, c) => s + c.discountItem, 0);
  const discountShip = best.reduce((s, c) => s + c.discountShipping, 0);
  const finalShip = Math.max(0, shipFee - discountShip);
  const finalTotal = Math.max(0, orderTotal - discountItems) + finalShip;
  return {
    orderTotal,
    shippingFee: finalShip,
    discountTotal: discountItems + discountShip,
    finalTotal,
    appliedCoupons: best,
  } as CouponApplyResult;
};

export default function useCouponApply({
  coupons = [],
  selectedShoppingCartItems = [],
  isIsland = false,
}: Props) {
  const result = useMemo(() => {
    const now = new Date();
    const orderTotal = getCartTotal(selectedShoppingCartItems);
    const shipFee = getBaseShipping(orderTotal, isIsland);

    const candidates: CouponApplied[] = [];
    for (const c of coupons) {
      const valid = calcDiscount(
        c,
        selectedShoppingCartItems,
        orderTotal,
        shipFee,
        now
      );
      if (valid) candidates.push(valid);
    }

    return chooseBestCombo(candidates, shipFee, orderTotal);
  }, [coupons, selectedShoppingCartItems, isIsland]);

  return result;
}
