import { OrderInformation } from '../hooks/useOrderInformation';
import { CouponType } from '../types';

interface Args {
  coupon?: CouponType;
  orderInformation: OrderInformation;
}

export const isAvailableCoupon = ({ coupon, orderInformation }: Args) => {
  if (!coupon) return false;

  const { code } = coupon;

  switch (code) {
    case 'FIXED5000':
      return coupon.minimumAmount <= orderInformation.totalPrice;

    case 'BOGO':
      return orderInformation.selectedItems.some(
        (cartItem) => cartItem.quantity >= coupon.buyQuantity
      );

    case 'FREESHIPPING':
      return coupon.minimumAmount <= orderInformation.totalPrice;

    case 'MIRACLESALE':
      return (() => {
        const now = new Date();
        const date = now.toLocaleDateString('ko');

        const { start, end } = coupon.availableTime;
        const startTime = new Date(`${date} ${start}`);
        const endTime = new Date(`${date} ${end}`);

        return now >= startTime && now <= endTime;
      })();

    default:
      return false;
  }
};
