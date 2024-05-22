import { CartItem } from '../../types/cartItem.type';
import { Coupon } from '../../types/coupon.type';

export const calcFixedDiscountAmount = (coupon: Coupon, price: number) => {
  if (price < (coupon.discount ?? 0)) return price;

  return coupon.discount;
};

export const calcPercentageDiscountAmount = (coupon: Coupon, price: number) => {
  return Math.floor(price * ((coupon.discount ?? 0) / 100));
};

export const calcShippingFeeDiscountAmount = (_: Coupon): 'free' | number => {
  // 배송비 일부 할인 쿠폰이 나오는 것을 대비함
  return 'free';
};

export const calcBuyXGetYDiscountAmount = (coupon: Coupon, selectedItemList: CartItem[]) => {
  const minimumQuantity = (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0);

  if (minimumQuantity === 0) return 0;

  const priceListOverMinimumQuantity = selectedItemList
    .filter(({ quantity }) => quantity >= minimumQuantity)
    .map(({ product }) => product.price);

  return Math.max(...priceListOverMinimumQuantity);
};
