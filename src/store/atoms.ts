import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api';

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

type HasShippingFeeType = {
  hasBasicFee: boolean;
  hasAdditionalFee: boolean;
};

const initialShippingFee: HasShippingFeeType = { hasBasicFee: false, hasAdditionalFee: false };

export const shippingFeeState = atom<HasShippingFeeType>({
  key: 'shippingFeeState',
  default: initialShippingFee,
});
