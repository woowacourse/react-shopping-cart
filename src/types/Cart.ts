import { Id, Product } from "./Product";

export interface CartItem {
  id: Id;
  quantity: number;
  product: Product;
}
