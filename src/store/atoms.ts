import { atom, selector } from 'recoil';
import { fetchCartItems, fetchCoupons } from '../api';
import { CouponType } from '../types';

export const productsState = atom({
  key: 'productsState',
  default: selector({
    key: 'productsState/Default',
    get: async () => {
      const products = await fetchCartItems();
      return products;
    },
  }),
});

export const isCheckedState = atom<Record<number, boolean>>({
  key: 'isCheckedState',
  default: {},
  effects: [
    ({ onSet }) => {
      onSet((state: Record<number, boolean>) => {
        window.localStorage.setItem('isChecked', JSON.stringify(state));
      });
    },
  ],
});

export const additionalShippingFeeStatusState = atom({
  key: 'additionalShippingFeeStatusState',
  default: false,
});

export const couponsState = atom<CouponType[]>({
  key: 'couponsState',
  default: selector({
    key: 'couponsState/Default',
    get: async () => {
      const coupons = await fetchCoupons();
      return coupons;
    },
  }),
});

export const couponSelectedState = atom<Record<string, boolean>>({
  key: 'couponSelectedState',
  default: {},
});

export const activeCouponCodesState = atom<string[]>({
  key: 'activeCouponCodesState',
  default: [],
});
