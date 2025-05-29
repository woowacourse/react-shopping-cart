import { Product } from "./Product";

type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export default CartItem;
