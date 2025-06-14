import { CartItem } from "./CartItem";

export interface OrderConfirmationLocationState {
  selectedCartItemsLength: number;
  selectedCartItemsCount: number;
  totalPrice: number;
  shippingFee: number;
  totalPriceWithShipping: number;
  selectedCartItemsData: CartItem[];
}
