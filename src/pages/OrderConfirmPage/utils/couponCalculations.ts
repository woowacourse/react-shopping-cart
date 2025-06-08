import { CouponData, OrderItem } from "../types";

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

  let totalDiscount = 0;

  Object.values(productGroups).forEach(({ price, totalQuantity }) => {
    if (totalQuantity >= 2) {
      const freeItems = Math.floor(totalQuantity / 2);
      totalDiscount += freeItems * price;
    }
  });

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
