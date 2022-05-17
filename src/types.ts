import { TYPES } from './redux/actions';
import theme from './styles/theme';

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
  type: typeof TYPES[keyof typeof TYPES];
  payload: any;
};

export type StoreState = {
  isLoading: boolean;
  error: any;
  productList: Array<Product>;
  productDetail: Product | null;
};

export type Theme = typeof theme;
