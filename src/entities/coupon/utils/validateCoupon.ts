import { CouponType } from '@entities/coupon/type/coupon.type';
import { CartItemType } from '@entities/cart';
import { formatTime } from '@entities/coupon/utils/formatter';
import { calculateOrderPrice } from '@entities/cart';

interface ValidateCouponProps {
  coupon: CouponType;
  orderItems: CartItemType[];
}

const isExpired = (expirationDate: string) => {
  return new Date(expirationDate) < new Date();
};

const validateFixed5000 = (coupon: CouponType, orderPrice: number) => {
  if (coupon.code !== 'FIXED5000') return false;
  if (isExpired(coupon.expirationDate)) return false;
  return coupon.minimumAmount <= orderPrice;
};

const validateBogo = (coupon: CouponType, orderItems: CartItemType[]) => {
  if (coupon.code !== 'BOGO') return false;
  if (isExpired(coupon.expirationDate)) {
    return false;
  }
  const maxBuyQuantity = Math.max(...orderItems.map((item) => item.quantity));
  return coupon.buyQuantity <= maxBuyQuantity;
};

const validateFreeShipping = (coupon: CouponType, orderPrice: number) => {
  if (coupon.code !== 'FREESHIPPING') return false;
  if (isExpired(coupon.expirationDate)) return false;
  return coupon.minimumAmount <= orderPrice;
};

const validateMiracleSale = (coupon: CouponType) => {
  if (coupon.code !== 'MIRACLESALE') return false;
  if (isExpired(coupon.expirationDate)) return false;
  return (
    formatTime(coupon.availableTime.start) <= new Date().getHours() &&
    formatTime(coupon.availableTime.end) >= new Date().getHours()
  );
};

export const validateCoupon = ({ coupon, orderItems }: ValidateCouponProps) => {
  const orderPrice = calculateOrderPrice(orderItems);

  switch (coupon.code) {
    case 'FIXED5000':
      return validateFixed5000(coupon, orderPrice);

    case 'BOGO':
      return validateBogo(coupon, orderItems);

    case 'FREESHIPPING':
      return validateFreeShipping(coupon, orderPrice);

    case 'MIRACLESALE':
      return validateMiracleSale(coupon);

    default:
      return true;
  }
};
