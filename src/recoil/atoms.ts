import { atom, atomFamily, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { fetchGettingCartItems } from '../api/shoppingCart';
import { fetchGettingCoupons } from '../api/coupons';

export const cartItemsState = atom({
  key: 'cartItems',
  default: selector({
    key: 'fetchedCartItems',
    get: async () => {
      return await fetchGettingCartItems();
    },
  }),
});

const { persistAtom } = recoilPersist({
  key: 'isCartItemSelected',
  storage: localStorage,
});

export const isCartItemSelectedState = atomFamily<boolean, number>({
  key: 'isCartItemSelected',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const isCountrysideSelectedState = atom({
  key: 'isCountrysideSelected',
  default: false,
});

export const couponsState = atom({
  key: 'coupons',
  default: selector({
    key: 'fetchedCoupons',
    get: async () => {
      return await fetchGettingCoupons();
    },
  }),
});

export const isCouponApplicableState = atomFamily<boolean, number>({
  key: 'isCouponApplicable',
  default: true,
});

export const isCouponSelectedState = atomFamily<boolean, number>({
  key: 'isCouponSelected',
  default: false,
});

export const isApplyingCouponModalOpenState = atom({
  key: 'isApplyingCouponModalOpen',
  default: false,
});
