import { BOX_SIZE, FETCH_METHOD } from '@Constants/index';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: Product;
  isSelected: boolean;
};

export type fetchMethod = keyof typeof FETCH_METHOD;

export type UpdateCartItem = (url: string, method: fetchMethod, body?: BodyInit | null | undefined) => void;

export type BoxSize = keyof typeof BOX_SIZE;
