import { BOX_SIZE, FETCH_METHOD } from '@Constants/index';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ShoppingCartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

export type fetchMethod = keyof typeof FETCH_METHOD;

export type UpdateShoppingCart = (url: string, method: fetchMethod, body?: BodyInit | null | undefined) => void;

export type BoxSize = keyof typeof BOX_SIZE;
