import { ProductWithQuantity } from "./Product";

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductWithQuantity;
}
