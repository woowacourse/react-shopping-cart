import { Product } from './product';
import { cartTypes } from 'redux/actions';

export type Cart = {
  id: Product['id'];
  stock: number;
  checked: boolean;
};

export type CartAction = {
  type: typeof cartTypes[keyof typeof cartTypes];
  payload?: any;
};

export type CartStoreState = {
  cart: Array<Cart>;
};

export type CartProductState = {
  product: Product;
  stock: number;
  checked: boolean;
};
