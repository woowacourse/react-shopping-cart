import { CartItemTypes } from '../types/cartItem';
import { Coupon } from '../types/coupon';

interface calculateCouponPriceProps {
  selectedCoupons: Coupon[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
  nowDate: Date;
}

type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

type CouponHandler = (args: {
  coupon: Coupon;
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
  nowDate: Date;
  totalPrice: number;
  discountedPrice: number;
}) => number;

const couponHandlers: Record<CouponCode, CouponHandler> = {
  FIXED5000: ({ coupon, totalPrice }) => {
    if (
      coupon.minimumAmount &&
      coupon.discount &&
      totalPrice >= coupon.minimumAmount
    ) {
      return coupon.discount;
    }
    return 0;
  },
  BOGO: ({ coupon, selectedCartItems }) => {
    const { buyQuantity, getQuantity } = coupon;
    if (!buyQuantity || !getQuantity) return 0;

    const over = selectedCartItems.filter(
      (item) => item.quantity >= buyQuantity + getQuantity
    );

    if (over.length === 0) return 0;

    const prices = over.map(
      (e) =>
        Math.floor(e.quantity / (buyQuantity + getQuantity)) *
        e.product.price *
        getQuantity
    );
    return Math.max(...prices);
  },
  FREESHIPPING: ({ coupon, totalPrice, deliveryFee }) => {
    if (coupon.minimumAmount && totalPrice >= coupon.minimumAmount) {
      return deliveryFee;
    }
    return 0;
  },
  MIRACLESALE: ({ coupon, discountedPrice }) => {
    return coupon.discount ? (discountedPrice * coupon.discount) / 100 : 0;
  },
};

export const calculateCouponPrice = ({
  selectedCoupons,
  selectedCartItems,
  deliveryFee,
  nowDate,
}: calculateCouponPriceProps) => {
  const totalPrice = selectedCartItems.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  );

  let sum = 0;
  let discountedPrice = totalPrice;

  selectedCoupons.forEach((coupon) => {
    if (getIsExpired(coupon.expirationDate, nowDate)) return;

    if (
      coupon.availableTime &&
      !isWithinAvailableTime(coupon.availableTime, nowDate)
    )
      return;

    const handler = couponHandlers[coupon.code];
    if (!handler) return;

    const discount = handler({
      coupon,
      selectedCartItems,
      deliveryFee,
      nowDate,
      totalPrice,
      discountedPrice,
    });

    sum += discount;
    discountedPrice -= discount;
  });

  return sum;
};

const getIsExpired = (expirationDateString: string, nowDate = new Date()) => {
  const expirationDate = new Date(expirationDateString);
  return expirationDate < nowDate;
};

const isWithinAvailableTime = (
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
