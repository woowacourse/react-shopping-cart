import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';

export function calculateOrderPriceAndShipping(items: Content[], isIslandChecked: boolean = false) {
  let orderPrice = 0;
  let totalQuantity = 0;

  for (const item of items) {
    orderPrice += item.product.price * item.quantity;
    totalQuantity += item.quantity;
  }

  const shippingFee = orderPrice >= 100000 ? 0 : 3000;
  const islandFee = isIslandChecked ? 3000 : 0;
  const totalShippingFee = shippingFee + islandFee;
  const orderTotalPrice = orderPrice + totalShippingFee;

  return { orderPrice, shippingFee: totalShippingFee, orderTotalPrice, totalQuantity };
}

export function calculateDiscountAndTotalPrice(
  selectedCoupons: CouponsResponse[],
  selectedItems: Content[],
  orderPrice: number,
  shippingFee: number
) {
  let discount = 0;
  let discountedPrice = orderPrice;

  const percentCoupon = selectedCoupons.find((coupon) => coupon.description === '미라클 모닝 30% 시간제 할인 쿠폰');

  if (percentCoupon) {
    const percentDiscount = Math.floor(orderPrice * 0.3);
    discount += percentDiscount;
    discountedPrice -= percentDiscount;
  }

  const otherCoupons = selectedCoupons.filter((coupon) => coupon.description !== '미라클 모닝 30% 시간제 할인 쿠폰');

  const getCouponEffect = (coupon: CouponsResponse): number => {
    switch (coupon.description) {
      case '5,000원 할인 쿠폰':
        return 5000;
      case '2개 구매 시 1개 무료 쿠폰': {
        const map = new Map<number, { quantity: number; price: number }>();
        selectedItems.forEach((item) => {
          const id = item.product.id;
          const existing = map.get(id);
          if (existing) existing.quantity += item.quantity;
          else map.set(id, { quantity: item.quantity, price: item.product.price });
        });
        let max = 0;
        map.forEach(({ quantity, price }) => {
          if (quantity >= 2 && price > max) max = price;
        });
        return max;
      }
      case '5만원 이상 구매 시 무료 배송 쿠폰':
        return shippingFee;
      default:
        return 0;
    }
  };

  const sortedCoupons = [...otherCoupons].sort((a, b) => getCouponEffect(b) - getCouponEffect(a));

  for (const coupon of sortedCoupons) {
    switch (coupon.description) {
      case '5,000원 할인 쿠폰':
        discount += 5000;
        discountedPrice -= 5000;
        break;

      case '2개 구매 시 1개 무료 쿠폰': {
        const map = new Map<number, { quantity: number; price: number }>();
        selectedItems.forEach((item) => {
          const id = item.product.id;
          const existing = map.get(id);
          if (existing) existing.quantity += item.quantity;
          else map.set(id, { quantity: item.quantity, price: item.product.price });
        });
        let max = 0;
        map.forEach(({ quantity, price }) => {
          if (quantity >= 2 && price > max) max = price;
        });
        discount += max;
        discountedPrice -= max;
        break;
      }

      case '5만원 이상 구매 시 무료 배송 쿠폰':
        discount += shippingFee;
        break;

      default:
        break;
    }
  }

  const totalPrice =
    discountedPrice +
    shippingFee -
    (selectedCoupons.some((c) => c.description === '5만원 이상 구매 시 무료 배송 쿠폰') ? shippingFee : 0);

  return { totalDiscount: discount, totalPrice };
}
