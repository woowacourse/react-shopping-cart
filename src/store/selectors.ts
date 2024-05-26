import { selector, selectorFamily } from 'recoil';
import { activeCouponCodesState, isCheckedState, mockCoupons, productsState } from './atoms';
import { CartItemType, CouponType } from '../types';
import { CART_POLICY } from '../constants/policy';

type AmountType = {
  orderAmount: number;
  deliveryCharge: number;
  totalAmount: number;
};

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

export const totalOrderAmountState = selector<AmountType>({
  key: 'totalOrderAmountState',
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

    const deliveryCharge =
      orderAmount < CART_POLICY.shipping_throughput
        ? CART_POLICY.shipping_basic_fee
        : CART_POLICY.shipping_free;

    const discountAmount = get(discountAmountState);
    const totalAmount = orderAmount + deliveryCharge - discountAmount;

    return {
      orderAmount,
      deliveryCharge,
      totalAmount,
    };
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

const applyCoupon = (coupon: CouponType, product: CartItemType): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'buyXgetY':
      if (product.quantity >= (coupon.buyQuantity ?? 0)) {
        return product.product.price * (coupon.getQuantity ?? 0);
      }
      return 0;
    case 'freeShipping':
      return 3000;
    case 'percentage':
      if (coupon.discount)
        return product.product.price * product.quantity * (coupon.discount / 100);
      return 0;
    default:
      return 0;
  }
};

const calculator = (activeCoupons: CouponType[], products: CartItemType[]): number => {
  let maxDiscount = 0;

  activeCoupons.forEach((coupon) => {
    let bestDiscount = 0;

    products.forEach((product) => {
      const discount = applyCoupon(coupon, product);
      if (discount > bestDiscount) {
        bestDiscount = discount;
      }
    });

    maxDiscount += bestDiscount;
  });

  return maxDiscount;
};

export const discountAmountState = selector({
  key: 'discountAmountState',
  get: ({ get }) => {
    const coupons = mockCoupons;
    const activeCouponCodes = get(activeCouponCodesState);
    const activeCoupons = coupons.filter((coupon) => activeCouponCodes.includes(coupon.code));

    const isCheckedMap = get(isCheckedState);
    const checkoutProducts = get(productsState).filter(
      (product) => isCheckedMap[product.id] === true,
    );

    return calculator(activeCoupons, checkoutProducts);
  },
});
