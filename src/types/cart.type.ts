import { ProductType } from "./product.type";

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface CartType {
  content: CartItemType[];
}

export interface FilteredCartItemStateType {
  id: number;
  quantity: number;
  price: number;
  isSelected: boolean;
}
