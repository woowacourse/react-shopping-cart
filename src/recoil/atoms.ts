import { atom } from 'recoil';
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

export const checkedCartItemsState = atom<number[]>({
  key: 'checkedCartItems',
  default: [],
});

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});
