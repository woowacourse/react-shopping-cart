import { TYPES } from './redux/actions';
import theme from './styles/theme';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  brandId: string;
  categoryId: string;
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
