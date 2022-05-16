import { types } from './redux/actions';

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
  isLoading: boolean;
  error: any;
  productList: Array<Product>;
  productDetail: Product | null;
};
