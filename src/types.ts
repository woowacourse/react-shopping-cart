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

export type CartItem = {
  userId: string;
  quantity: number;
};

export type Action = {
  type: typeof TYPES[keyof typeof TYPES];
  payload: any;
};

export type StoreState = {
  userId: string;
  isLoading: boolean;
  error: any;
  productList: Product[];
  productDetail: Product | null;
  cart: { product: Product; quantity: number; checked: boolean }[];
};

export type Theme = typeof theme;
