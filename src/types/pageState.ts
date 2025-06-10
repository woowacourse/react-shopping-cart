import type { CartItemType } from "./response";

export interface OrderConfirmationState {
  orderItems: CartItemType[];
  orderPrice: number;
  deliveryFee: number;
}

export interface ProductDetailState {
  productId: number;
  fromSearch?: boolean;
}
