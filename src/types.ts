import CONDITION from 'constants/condition';
import { types } from 'redux/actions/actions';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  brandId: number;
  categoryId: number;
  createdAt: number;
};

export type Action = {
  type: typeof types[keyof typeof types];
  payload: any;
};

type condition = typeof CONDITION[keyof typeof CONDITION];

export type StoreState = {
  condition: condition;
  productList: Array<Product>;
  productDetail: Product | null;
};
