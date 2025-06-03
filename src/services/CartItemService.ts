import { CartItem } from "@/types";

export default class CartItemService {
  #FREE_DELIVERY_PRICE = 100_000;
  #DELIVERY_FEE = 3_000;

  constructor(private readonly cartItems: CartItem[] = []) {}

  calculateTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  }

  calculateTotalQuantity() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  calculateTotalType() {
    return this.cartItems.length;
  }

  calculateDeliveryFee(isFar: boolean) {
    return this.calculateTotalPrice() >= this.#FREE_DELIVERY_PRICE
      ? 0
      : isFar
      ? this.#DELIVERY_FEE * 2
      : this.#DELIVERY_FEE;
  }

  calculateTotalPriceWithDeliveryFee(isFar: boolean) {
    return this.calculateTotalPrice() + this.calculateDeliveryFee(isFar);
  }
}
