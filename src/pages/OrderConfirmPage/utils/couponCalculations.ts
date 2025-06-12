import { CouponData, OrderItem } from "../types";
import { validateCouponUsage } from "./couponValidation";
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
      // 배송비 쿠폰의 할인 금액은 별도로 계산
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
  isIsolatedAreaSelected: boolean,
): { productDiscount: number; shippingDiscount: number; hasShippingCoupon: boolean } {
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

  const shippingCoupons = selectedCoupons.filter((c) => c.discountType === "freeShipping");
  const hasShippingCoupon = shippingCoupons.length > 0;

  // 상품 할인 계산
  let productDiscount = 0;
  let currentAmount = orderAmount;

  for (const coupon of productCoupons) {
    const discount = calculateSingleCouponDiscount(coupon, orderItems, currentAmount);
    productDiscount += discount;
    currentAmount = Math.max(0, currentAmount - discount);
  }

  // 배송비 할인 계산
  let shippingDiscount = 0;
  if (hasShippingCoupon) {
    const originalShipping = calculateShippingFee({
      orderAmount,
      isIsolatedAreaSelected,
      hasShippingCoupon: false,
    });

    const discountedShipping = calculateShippingFee({
      orderAmount,
      isIsolatedAreaSelected,
      hasShippingCoupon: true,
    });

    shippingDiscount = originalShipping.fee - discountedShipping.fee;
  }

  return { productDiscount, shippingDiscount, hasShippingCoupon };
}

export function findOptimalCouponCombination(
  coupons: CouponData[],
  orderItems: OrderItem[],
  orderAmount: number,
  isIsolatedAreaSelected: boolean,
): number[] {
  const usableCoupons = coupons.filter(
    (coupon) => validateCouponUsage({ coupon, orderItems, orderAmount, isIsolatedAreaSelected }).isValid,
  );

  if (usableCoupons.length === 0) return [];

  const usableCouponIds = usableCoupons.map((c) => c.id);
  const combinations = generateCouponCombinations(usableCouponIds);

  let bestCombination: number[] = [];
  let maxTotalSaving = 0;

  combinations.forEach((combination) => {
    const { productDiscount, shippingDiscount } = calculateCombinationDiscount(
      combination,
      coupons,
      orderItems,
      orderAmount,
      isIsolatedAreaSelected,
    );

    const totalSaving = productDiscount + shippingDiscount;

    if (totalSaving > maxTotalSaving) {
      maxTotalSaving = totalSaving;
      bestCombination = combination;
    }
  });

  return bestCombination;
}

function generateCouponCombinations(couponIds: number[]): number[][] {
  const combinations: number[][] = [];

  combinations.push([]);

  couponIds.forEach((id) => combinations.push([id]));

  for (let i = 0; i < couponIds.length; i++) {
    for (let j = i + 1; j < couponIds.length; j++) {
      combinations.push([couponIds[i], couponIds[j]]);
    }
  }

  return combinations;
}

export function calculateOrderTotal(
  orderItems: OrderItem[],
  selectedCouponIds: number[],
  coupons: CouponData[],
  isIsolatedAreaSelected: boolean,
) {
  const orderAmount = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const { productDiscount, shippingDiscount, hasShippingCoupon } = calculateCombinationDiscount(
    selectedCouponIds,
    coupons,
    orderItems,
    orderAmount,
    isIsolatedAreaSelected,
  );

  const subtotal = Math.max(0, orderAmount - productDiscount);

  const shippingCalculation = calculateShippingFee({
    orderAmount,
    isIsolatedAreaSelected,
    hasShippingCoupon,
  });

  const finalAmount = subtotal + shippingCalculation.fee;

  // 총 쿠폰 할인 금액에 배송비 할인도 포함
  const totalCouponDiscount = productDiscount + shippingDiscount;

  return {
    orderAmount,
    couponDiscount: totalCouponDiscount, // 상품 할인 + 배송비 할인
    subtotal,
    shippingFee: shippingCalculation.fee,
    finalAmount,
    selectedCoupons: selectedCouponIds,
  };
}
