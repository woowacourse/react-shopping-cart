import { CartItemType } from '@entities/cart';
import { CouponType, ClientCouponType } from '@entities/coupon/type/coupon.type';
import { calculateOrderPrice } from '@features/cart/utils/cartPriceCalculator';
import { COUPON_RULE } from '@features/coupon/constants/couponRule';

interface CalculateCouponDiscountProps {
  coupon: CouponType;
  orderItems: CartItemType[];
  deliveryFee: number;
}

const calculateBogoDiscount = (orderItems: CartItemType[]) => {
  const itemsWithMultiples = orderItems.filter((item) => item.quantity >= 2);

  if (itemsWithMultiples.length > 0) {
    const highestPricedItem = itemsWithMultiples.reduce((max, current) =>
      current.product.price > max.product.price ? current : max,
    );

    return highestPricedItem.product.price * (highestPricedItem.quantity / 3);
  }
  return 0;
};

export const calculateCouponDiscount = ({
  coupon,
  orderItems,
  deliveryFee,
}: CalculateCouponDiscountProps) => {
  const orderPrice = calculateOrderPrice(orderItems);

  switch (coupon.code) {
    case 'FIXED5000':
      return coupon.discount;
    case 'BOGO':
      return calculateBogoDiscount(orderItems);
    case 'FREESHIPPING':
      return deliveryFee;
    case 'MIRACLESALE':
      return (orderPrice * coupon.discount) / 100;
    default:
      return 0;
  }
};

export const calculateCouponDiscountTotalPrice = (clientCoupons: ClientCouponType[]) => {
  return clientCoupons.reduce(
    (acc, coupon) => (coupon.checked ? acc + coupon.discountPrice : acc),
    0,
  );
};

export const recommendCouponComposition = (clientCoupons: ClientCouponType[]) => {
  const availableCoupons = clientCoupons.filter((coupon) => !coupon.disabled);
  const sortedCoupons = [...availableCoupons].sort((a, b) => b.discountPrice - a.discountPrice);
  return sortedCoupons.slice(0, COUPON_RULE.MAX_COUPON_COUNT).map((coupon) => coupon.coupon.id);
};
