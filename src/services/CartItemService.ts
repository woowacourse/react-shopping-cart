import { CartItem } from "@/types";

export default class CartItemService {
  static #FREE_DELIVERY_PRICE = 100_000;
  static #DELIVERY_FEE = 3_000;

  static calculateTotalPrice(cartItems: CartItem[]) {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  }

  static calculateTotalQuantity(cartItems: CartItem[]) {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  static calculateTotalType(cartItems: CartItem[]) {
    return cartItems.length;
  }

  static calculateDeliveryFee(totalPrice: number) {
    return totalPrice >= this.#FREE_DELIVERY_PRICE ? 0 : this.#DELIVERY_FEE;
  }

  static calculateTotalPriceWithDeliveryFee(totalPrice: number) {
    return totalPrice + this.calculateDeliveryFee(totalPrice);
  }
}
