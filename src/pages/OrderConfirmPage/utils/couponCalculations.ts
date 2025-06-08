import { CouponData, OrderItem } from "../types";
import { calculateShippingFee } from "./shippingCalculations";

function calculateBogoDiscount(orderItems: OrderItem[]): number {
  const productGroups = orderItems.reduce(
    (acc, item) => {
      const productId = item.product.id;
      if (!acc[productId]) {
        acc[productId] = { price: item.product.price, totalQuantity: 0 };
      }
      acc[productId].totalQuantity += item.quantity;
      return acc;
    },
    {} as Record<number, { price: number; totalQuantity: number }>,
  );

  const totalDiscount = Object.values(productGroups).reduce((acc, product) => {
    const { price, totalQuantity } = product;
    if (totalQuantity >= 2) return (acc += price);

    return acc;
  }, 0);
  return totalDiscount;
}

export function calculateSingleCouponDiscount(
  coupon: CouponData,
  orderItems: OrderItem[],
  orderAmount: number,
): number {
  switch (coupon.discountType) {
    case "fixed":
      return Math.min(coupon.discount || 0, orderAmount);

    case "percentage":
      return Math.floor(orderAmount * ((coupon.discount || 0) / 100));

    case "buyXgetY":
      return calculateBogoDiscount(orderItems);

    case "freeShipping":
      return 0;

    default:
      return 0;
  }
}

function calculateCombinationDiscount(
  couponIds: number[],
  coupons: CouponData[],
  orderItems: OrderItem[],
  orderAmount: number,
): { productDiscount: number; hasShippingCoupon: boolean } {
  const selectedCoupons = coupons.filter((c) => couponIds.includes(c.id));

  const productCoupons = selectedCoupons
    .filter((c) => c.discountType !== "freeShipping")
    .sort((a, b) => {
      const order: Record<"percentage" | "fixed" | "buyXgetY" | "freeShipping", number> = {
        percentage: 1,
        fixed: 2,
        buyXgetY: 3,
        freeShipping: 4,
      };
      return order[a.discountType] - order[b.discountType];
    });

  const hasShippingCoupon = selectedCoupons.some((c) => c.discountType === "freeShipping");

  let totalDiscount = 0;
  let currentAmount = orderAmount;

  for (const coupon of productCoupons) {
    const discount = calculateSingleCouponDiscount(coupon, orderItems, currentAmount);
    totalDiscount += discount;
    currentAmount = Math.max(0, currentAmount - discount);
  }

  return { productDiscount: totalDiscount, hasShippingCoupon };
}

export function calculateOrderTotal(
  orderItems: OrderItem[],
  selectedCouponIds: number[],
  coupons: CouponData[],
  isIsolatedAreaSelected: boolean,
) {
  const orderAmount = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const { productDiscount, hasShippingCoupon } = calculateCombinationDiscount(
    selectedCouponIds,
    coupons,
    orderItems,
    orderAmount,
  );

  const subtotal = Math.max(0, orderAmount - productDiscount);

  const shippingCalculation = calculateShippingFee({
    orderAmount,
    isIsolatedAreaSelected,
    hasShippingCoupon,
  });

  const finalAmount = subtotal + shippingCalculation.fee;

  return {
    orderAmount,
    couponDiscount: productDiscount,
    subtotal,
    shippingFee: shippingCalculation.fee,
    shippingDescription: shippingCalculation.description,
    finalAmount,
    selectedCoupons: selectedCouponIds,
  };
}
