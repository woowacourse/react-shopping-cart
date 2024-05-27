import { selector, selectorFamily } from 'recoil';
import {
  activeCouponCodesState,
  additionalShippingFeeStatusState,
  couponsState,
  isCheckedState,
  productsState,
} from './atoms';
import { CartItemType, CouponType } from '../types';
import { CART_POLICY } from '../constants/policy';

export const productsIdState = selector({
  key: 'productsIdState',
  get: ({ get }) => {
    const keys = get(productsState).map((product: CartItemType) => {
      return product.id;
    });

    return keys;
  },
});

export const productQuantityState = selectorFamily<number, number>({
  key: 'productQuantityState',
  get:
    (id: number) =>
    ({ get }) => {
      const products = get(productsState);
      const product = products.find((item) => item.id === id);
      return product ? product.quantity : 0;
    },
});

export const orderAmountState = selector({
  key: 'orderAmountState',
  get: ({ get }) => {
    const products = get(productsState);
    const isCheckedMap = get(isCheckedState);
    const orderAmount = products.reduce((accumulator, product) => {
      const isChecked = isCheckedMap[product.id];
      if (isChecked) {
        const quantity = get(productQuantityState(product.id));
        return accumulator + product.product.price * quantity;
      }
      return accumulator;
    }, 0);

    return orderAmount;
  },
});

export const totalAmountState = selector({
  key: 'totalAmountState',
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const discountAmount = get(discountAmountState);
    const { totalShippingFee } = get(totalShippingFeeState);

    return orderAmount + totalShippingFee - discountAmount;
  },
});

export const totalProductQuantityState = selector({
  key: 'totalProductQuantityState',
  get: ({ get }) => {
    let totalCount = 0;
    let totalQuantity = 0;

    const keys = get(productsIdState);
    const isAllCheckedMap = get(isCheckedState);
    keys.forEach((key) => {
      const isChecked = isAllCheckedMap[key];

      if (isChecked === true) {
        const quantity = get(productQuantityState(key));
        totalCount++;
        totalQuantity += quantity;
      }
    });

    return {
      totalCount,
      totalQuantity,
    };
  },
});

const applyCoupon = (
  coupon: CouponType,
  product: CartItemType,
  totalShippingFee: number,
  orderAmount: number,
): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'buyXgetY':
      if (product.quantity >= (coupon.buyQuantity ?? 0)) {
        return product.product.price * (coupon.getQuantity ?? 0);
      }
      return 0;
    case 'freeShipping':
      return totalShippingFee;
    case 'percentage':
      if (coupon.discount) return orderAmount * (coupon.discount / 100);
      return 0;
    default:
      return 0;
  }
};

const calculator = (
  activeCoupons: CouponType[],
  products: CartItemType[],
  orderAmount: number,
  totalShippingFee: number,
): number => {
  let maxDiscount = 0;

  activeCoupons.forEach((coupon) => {
    let bestDiscount = 0;

    products.forEach((product) => {
      const discount = applyCoupon(coupon, product, totalShippingFee, orderAmount);
      if (discount > bestDiscount) {
        bestDiscount = discount;
      }
    });

    maxDiscount += bestDiscount;
  });

  return maxDiscount;
};

export const totalShippingFeeState = selector({
  key: 'totalShippingFeeState',
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const additionalShippingFeeStatus = get(additionalShippingFeeStatusState);

    const baseShippingFee =
      orderAmount >= CART_POLICY.shipping_throughput
        ? CART_POLICY.shipping_free
        : CART_POLICY.shipping_basic_fee;
    const totalShippingFee = additionalShippingFeeStatus
      ? CART_POLICY.shipping_additional_fee + baseShippingFee
      : baseShippingFee;

    return { baseShippingFee, totalShippingFee };
  },
});

export const discountAmountState = selector({
  key: 'discountAmountState',
  get: ({ get }) => {
    const coupons = get(couponsState);
    const activeCouponCodes = get(activeCouponCodesState);
    const activeCoupons = coupons.filter((coupon) => activeCouponCodes.includes(coupon.code));

    const isCheckedMap = get(isCheckedState);
    const checkoutProducts = get(productsState).filter(
      (product) => isCheckedMap[product.id] === true,
    );

    const orderAmount = get(orderAmountState);
    const { totalShippingFee } = get(totalShippingFeeState);

    return calculator(activeCoupons, checkoutProducts, orderAmount, totalShippingFee);
  },
});
