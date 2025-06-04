import { BaseFetchItemsResult } from "./BaseFetchItemsResult";
import { ProductWithQuantity } from "./Product";

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductWithQuantity;
}

export type FetchCartItemsResult = {
  content: CartItem[];
} & BaseFetchItemsResult;
