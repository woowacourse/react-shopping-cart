import { cartTypes, productTypes } from 'redux/actions/actions';

import CONDITION from 'constants/condition';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
};

export type Cart = {
  id: Product['id'];
  stock: number;
};

export type ProductAction = {
  type: typeof productTypes[keyof typeof productTypes];
  payload: any;
};

export type CartAction = {
  type: typeof cartTypes[keyof typeof cartTypes];
  payload: any;
};

type condition = typeof CONDITION[keyof typeof CONDITION];

export type StoreState = {
  condition: condition;
  productList: Array<Product>;
  productDetail: Product | null;
};

export type CartState = {
  cart: Array<Cart>;
};
