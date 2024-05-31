import { DISCOUNT_CODE } from '@/constants/discount';
import ORDER_CONDITION from '@/constants/order';
import { atom, DefaultValue, selector } from 'recoil';
import { allCouponStates } from './couponStates';
import { orderAmountSelector } from './cartStates';

export const deliveryFeeSelector = selector({
  key: 'deliveryFee',
  get: ({ get }) => {
    const totalAmount = get(orderAmountSelector);
    const isFarShippingLocation = get(isFarShippingLocationState);
    const allCoupons = get(allCouponStates);
    const deliveryCoupon = allCoupons.find((coupon) => coupon.code === DISCOUNT_CODE.FREE_SHIPPING);

    return deliveryCoupon?.isChecked
      ? 0
      : isFarShippingLocation.isChecked
        ? ORDER_CONDITION.SHIPPING_FEE * 2
        : totalAmount >= ORDER_CONDITION.FREE_SHIPPING_PRICE
          ? 0
          : ORDER_CONDITION.SHIPPING_FEE;
  },
});

export const isFarShippingLocationState = atom({
  key: 'isFarShippingLocationState',
  default: selector({
    key: 'isFarShippingLocationDefault',
    get: ({ get }) => {
      const orderAmount = get(orderAmountSelector);
      return {
        isAvailable: orderAmount < ORDER_CONDITION.FREE_SHIPPING_PRICE,
        isChecked: false,
      };
    },
  }),
});

export const isFarShippingLocationSelector = selector({
  key: 'isFarShippingLocationSelector',
  get: ({ get }) => {
    return get(isFarShippingLocationState);
  },
  set: ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const orderAmount = get(orderAmountSelector);

      set(isFarShippingLocationState, {
        isAvailable: orderAmount < ORDER_CONDITION.FREE_SHIPPING_PRICE,
        isChecked:
          newValue.isChecked !== undefined
            ? newValue.isChecked
            : get(isFarShippingLocationState).isChecked,
      });
    }
  },
});
