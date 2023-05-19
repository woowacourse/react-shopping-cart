import { atom } from 'recoil';
import { getCartIdList } from '../utils/localStorage';
import { Product } from '../types/Product';

interface CartProductDetail {
  id: number;
  quantity: number;
  product: Product;
}

export const cartIdListState = atom<number[]>({
  key: 'cartIdListState',
  default: getCartIdList(),
});

export const selectedCartIdListState = atom<number[]>({
  key: 'selectedCartIdListState',
  default: [],
});

export const cartProductDetailListState = atom<CartProductDetail[]>({
  key: 'cartProductDetailListState',
  default: [],
});
