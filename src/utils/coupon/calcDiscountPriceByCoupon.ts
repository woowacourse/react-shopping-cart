import { ShippingDiscountType } from '../../recoil/price/discountPriceByCouponListState';
import { CartItem } from '../../types/cartItem.type';
import { Coupon } from '../../types/coupon.type';

export const calcFixedDiscountAmount = (coupon: Coupon, price: number) => {
  if (coupon.discount === undefined) return 0;

  if (price < coupon.discount) return price;

  return coupon.discount;
};

export const calcPercentageDiscountAmount = (coupon: Coupon, price: number) => {
  return Math.floor(price * ((coupon.discount ?? 0) / 100));
};

export const calcShippingFeeDiscountAmount = (_: Coupon): ShippingDiscountType => {
  // 배송비 일부 할인 쿠폰이 나오는 것을 대비함
  return 'free';
};

export const calcBuyXGetYDiscountAmount = (coupon: Coupon, selectedItemList: CartItem[]) => {
  if (coupon.buyQuantity === undefined || coupon.getQuantity === undefined) return 0;

  const minimumQuantity = coupon.buyQuantity + coupon.getQuantity;

  const priceListOverMinimumQuantity = selectedItemList
    .filter(({ quantity }) => quantity >= minimumQuantity)
    .map(({ product }) => product.price);

  return Math.max(...priceListOverMinimumQuantity) * coupon.getQuantity;
};
