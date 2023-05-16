import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LOCAL_STORAGE_KEY } from '../constants';
import { ProductInCart, ProductInfo } from '../types';

const { persistAtom } = recoilPersist({
  key: LOCAL_STORAGE_KEY.CART,
});

export const productsInCartState = atom<ProductInCart[]>({
  key: 'productsInCart',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});
