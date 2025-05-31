import { ProductWithQuantity } from "./Product";

export interface CartItem {
  id: string;
  quantity: number;
  product: ProductWithQuantity;
}
