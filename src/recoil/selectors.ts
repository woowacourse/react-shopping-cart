import { selector, selectorFamily } from 'recoil';

import {
  cartItemsState,
  isCartItemSelectedState,
  isCountrysideSelectedState,
  isCouponSelectedState,
} from './atoms';

import { CartItemType, CouponType } from '../type';
import CONDITION from '../constants/Condition';
import VALUE from '../constants/Value';
import { fetchGetCoupons } from '../api/coupons';

export const cartItemsCountSelector = selector<number>({
  key: 'cartItemsCount',
  get: ({ get }) => {
    return get(cartItemsState).length;
  },
});

export const cartItemIdsSelector = selector({
  key: 'CartItemIds',
  get: ({ get }) => {
    return get(cartItemsState).map((cartItem) => cartItem.id);
  },
});

export const selectedCartItemsSelector = selector<CartItemType[]>({
  key: 'selectedCartItems',
  get: ({ get }) => {
    return get(cartItemsState).filter((cartItem) =>
      get(isCartItemSelectedState(cartItem.id)),
    );
  },
});

export const applicableBOGOCartItemsSelector = selector<CartItemType[]>({
  key: 'applicableBOGOCartItems',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).filter(
      (cartItem) => cartItem.quantity >= 3,
    );
  },
});

export const selectedCartItemsCountSelector = selector<number>({
  key: 'selectedCartItemCount',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).length;
  },
});

export const isAllCartItemSelectedSelectorFamily = selectorFamily<
  boolean,
  number[]
>({
  key: 'selectedAllCartItem',
  get:
    (cartItemIds) =>
    ({ get }) => {
      return cartItemIds.every((itemId) =>
        get(isCartItemSelectedState(itemId)),
      );
    },
  set:
    (cartItemIds) =>
    ({ set }, newValue) => {
      cartItemIds.forEach((itemId) => {
        set(isCartItemSelectedState(itemId), newValue);
      });
    },
});

export const isSomeCartItemSelectedSelector = selector<boolean>({
  key: 'selectedSomeCartItem',
  get: ({ get }) => {
    return get(cartItemIdsSelector).some((cartItemId) =>
      get(isCartItemSelectedState(cartItemId)),
    );
  },
});

export const totalOrderAmountSelector = selector<number>({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).reduce(
      (totalOrderAmount, cartItem) => {
        const orderAmount = cartItem.product.price * cartItem.quantity;
        return totalOrderAmount + orderAmount;
      },
      0,
    );
  },
});

export const totalCartItemQuantitySelector = selector<number>({
  key: 'totalCartItemQuantity',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).reduce(
      (totalCartItemQuantity, cartItem) => {
        return totalCartItemQuantity + cartItem.quantity;
      },
      0,
    );
  },
});

export const shippingFeeSelector = selector<number>({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountSelector);

    if (
      totalOrderAmount >= CONDITION.freeShippingFee ||
      totalOrderAmount === CONDITION.noneSelected
    )
      return VALUE.shippingFee.free;

    return VALUE.shippingFee.default;
  },
});

export const finalShippingFeeSelector = selector<number>({
  key: 'finalShippingFee',
  get: ({ get }) => {
    const shippingFee = get(shippingFeeSelector);
    const isCountrysideSelected = get(isCountrysideSelectedState);
    const isCountrysideShippingFee =
      shippingFee !== VALUE.shippingFee.free && isCountrysideSelected;

    return isCountrysideShippingFee
      ? VALUE.shippingFee.countryside
      : shippingFee;
  },
});

export const totalPaymentAmountSelector = selector<number>({
  key: 'totalPaymentAmount',
  get: ({ get }) => {
    return get(totalOrderAmountSelector) + get(shippingFeeSelector);
  },
});

export const finalTotalPaymentAmountSelector = selector<number>({
  key: 'finalTotalPaymentAmount',
  get: ({ get }) => {
    return (
      get(totalOrderAmountSelector) -
      get(couponDiscountAmountSelector) +
      get(finalShippingFeeSelector)
    );
  },
});

export const couponsSelector = selector<CouponType[]>({
  key: 'coupons',
  get: async () => {
    return await fetchGetCoupons();
  },
});

export const couponIdsSelector = selector<number[]>({
  key: 'selectedCouponIds',
  get: ({ get }) => {
    return get(couponsSelector).map((coupon) => coupon.id);
  },
});

export const selectedCouponsSelector = selector<CouponType[]>({
  key: 'selectedCoupons',
  get: ({ get }) => {
    return get(couponsSelector).filter((coupon) =>
      get(isCouponSelectedState(coupon.id)),
    );
  },
});

export const isAllCouponSelectedSelectorFamily = selectorFamily<
  boolean,
  number[]
>({
  key: 'selectedAllCoupon',
  get:
    (couponIds) =>
    ({ get }) => {
      return couponIds.every((couponId) =>
        get(isCouponSelectedState(couponId)),
      );
    },
  set:
    (couponIds) =>
    ({ set }, newValue) => {
      couponIds.forEach((couponId) => {
        set(isCouponSelectedState(couponId), newValue);
      });
    },
});

export const fixedDiscountSelector = selector<number>({
  key: 'fixedDiscount',
  get: () => {
    return 5000;
  },
});

export const bogoDiscountSelector = selector<number>({
  key: 'bogoDiscount',
  get: ({ get }) => {
    return Math.max(
      ...get(applicableBOGOCartItemsSelector).map(
        (selectedCartItem) => selectedCartItem.product.price,
      ),
    );
  },
});

export const shippingFeeDiscountSelector = selector<number>({
  key: 'shippingFeeDiscount',
  get: ({ get }) => {
    return get(finalShippingFeeSelector);
  },
});

export const miracleMorningDiscountSelector = selector<number>({
  key: 'miracleMorningDiscount',
  get: ({ get }) => {
    return get(totalOrderAmountSelector) * 0.3;
  },
});

export const couponDiscountPriceSelectorFamily = selectorFamily<number, number>(
  {
    key: 'couponDiscountPrice',
    get:
      (couponId: number) =>
      ({ get }) => {
        switch (couponId) {
          case 1:
            return get(fixedDiscountSelector);
          case 2:
            return get(bogoDiscountSelector);
          case 3:
            return get(shippingFeeDiscountSelector);
          case 4:
            return get(miracleMorningDiscountSelector);
          default:
            return 0;
        }
      },
  },
);

export const couponDiscountAmountSelector = selector<number>({
  key: 'couponDiscountAmount',
  get: ({ get }) => {
    const selectedCoupons = get(selectedCouponsSelector);

    return selectedCoupons.reduce((couponDiscountAmount, selectedCoupon) => {
      return (
        couponDiscountAmount +
        get(couponDiscountPriceSelectorFamily(selectedCoupon.id))
      );
    }, 0);
  },
});
