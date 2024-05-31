import ORDER_CONDITION from '@/constants/order';
import { CartItemData, CouponData } from '@/types';
import { DISCOUNT_CODE } from '@/constants/discount';

type Props = {
  allCoupons: CouponData[];
  allCartItems: CartItemData[];
  orderAmount: number;
};

const HOURS = {
  MIN: 4,
  MAX: 7,
} as const;

const MIN_QUANTITY = 3;

const initializeCouponStates = ({ allCoupons, allCartItems, orderAmount }: Props) => {
  const currentTime = new Date();

  const mostExpensiveItemWithMinQuantity = allCartItems
    .filter((cartItem) => cartItem.quantity >= MIN_QUANTITY)
    .sort((a, b) => b.product.price - a.product.price)[0];

  const updatedCoupons = allCoupons.map((coupon) => {
    let isAvailable = true;
    const expirationDate = new Date(coupon.expirationDate);

    if (currentTime > expirationDate) {
      isAvailable = false;
    }

    switch (coupon.code) {
      case DISCOUNT_CODE.FIXED5000:
        if (orderAmount < ORDER_CONDITION.FREE_SHIPPING_PRICE) {
          isAvailable = false;
        }
        break;
      case DISCOUNT_CODE.BOGO:
        if (
          coupon.buyQuantity &&
          (!mostExpensiveItemWithMinQuantity ||
            mostExpensiveItemWithMinQuantity.quantity <= coupon.buyQuantity)
        ) {
          isAvailable = false;
        }
        break;
      case DISCOUNT_CODE.FREE_SHIPPING:
        if (
          (coupon.minimumAmount && orderAmount < coupon.minimumAmount) ||
          orderAmount >= ORDER_CONDITION.FREE_SHIPPING_PRICE
        ) {
          isAvailable = false;
        }

        break;
      case DISCOUNT_CODE.MIRACLESALE:
        const hours = currentTime.getHours();
        if (hours < HOURS.MIN || hours > HOURS.MAX) {
          isAvailable = false;
        }
        break;
      default:
        break;
    }

    return {
      ...coupon,
      isAvailable,
      isChecked: false,
    };
  });

  return updatedCoupons;
};

export default initializeCouponStates;
