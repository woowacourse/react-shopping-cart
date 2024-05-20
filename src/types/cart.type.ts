import { Product } from '@/types/product.type';

export interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

export interface FilteredCartItemStateType {
  id: number;
  quantity: number;
  price: number;
  isSelected: boolean;
}
