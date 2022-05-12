import { types } from './actions/actions';

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

export type StoreState = {
  productList: Array<Product>;
  productDetail: Product | null;
};
