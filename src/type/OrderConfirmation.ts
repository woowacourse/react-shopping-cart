import { CartItem } from "./CartItem";

export interface OrderConfirmationLocationState {
  selectedCartItems: CartItem[];
  finalPrice: number;
}
