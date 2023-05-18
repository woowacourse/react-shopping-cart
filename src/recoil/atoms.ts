import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LOCAL_STORAGE_KEY } from '../constants';
import { CartItemInfo, ProductInfo } from '../types';

const { persistAtom } = recoilPersist({
  key: LOCAL_STORAGE_KEY.CART,
});

export const cartListState = atom<CartItemInfo[]>({
  key: 'cartList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});
