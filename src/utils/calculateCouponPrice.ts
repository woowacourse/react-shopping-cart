import { CartItemTypes } from '../types/cartItem';
import { Coupon } from '../types/coupon';

interface calculateCouponPriceProps {
  couponIds: string[];
  coupons: Coupon[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
  nowDate: Date;
}

export const calculateCouponPrice = ({
  couponIds,
  coupons,
  selectedCartItems,
  deliveryFee,
  nowDate,
}: calculateCouponPriceProps) => {
  const totalPrice = selectedCartItems.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  );

  let sum = 0;

  couponIds.forEach((id) => {
    const coupon = coupons.find((e) => e.id === Number(id));
    if (!coupon) return;

    if (getIsExpired(coupon.expirationDate, nowDate)) return;

    if (
      coupon.availableTime &&
      !isWithinAvailableTime(coupon.availableTime, nowDate)
    )
      return;

    switch (coupon.id) {
      case 1:
        if (
          coupon.minimumAmount &&
          coupon.discount &&
          totalPrice >= coupon.minimumAmount
        ) {
          sum += coupon.discount;
        }
        break;
      case 2: {
        const { buyQuantity, getQuantity } = coupon;

        if (!buyQuantity || !getQuantity) return;

        const over = selectedCartItems.filter(
          (item) => item.quantity >= buyQuantity + getQuantity
        );

        if (over.length > 0) {
          const prices = over.map(
            (e) =>
              Math.floor(e.quantity / (buyQuantity + getQuantity)) *
              e.product.price *
              getQuantity
          );
          const maxPrice = Math.max(...prices);
          sum += maxPrice;
        }
        break;
      }
      case 3:
        if (coupon.minimumAmount && totalPrice >= coupon.minimumAmount) {
          sum += deliveryFee;
        }
        break;
      case 4:
        if (coupon.discount) {
          sum += (totalPrice * coupon.discount) / 100;
        }
        break;
      default:
        break;
    }
  });

  return sum;
};

export const getIsExpired = (
  expirationDateString: string,
  nowDate = new Date()
) => {
  const expirationDate = new Date(expirationDateString);
  return expirationDate < nowDate;
};

export const isWithinAvailableTime = (
  availableTime: { start: string; end: string },
  nowDate: Date
) => {
  const { start, end } = availableTime;

  const [startH, startM, startS] = start.split(':').map(Number);
  const [endH, endM, endS] = end.split(':').map(Number);

  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();
  const date = nowDate.getDate();

  const startTime = new Date(year, month, date, startH, startM, startS);
  const endTime = new Date(year, month, date, endH, endM, endS);

  return nowDate >= startTime && nowDate <= endTime;
};
