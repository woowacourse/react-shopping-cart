import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LOCAL_STORAGE_KEY } from '../constants';
import { CartItemInfo, ProductInfo } from '../types';

const { persistAtom: cartListAtom } = recoilPersist({
  key: LOCAL_STORAGE_KEY.CART,
});

export const cartListState = atom<CartItemInfo[]>({
  key: 'cartList',
  default: [],
  effects_UNSTABLE: [cartListAtom],
});

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});

export const checkedCartItemIdsState = atomFamily<number[], number[]>({
  key: 'checkedCartItemIds',
  default: (cartItemIds) => {
    return [...cartItemIds];
  },
});
