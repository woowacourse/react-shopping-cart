import { CartItem } from "@/types";

export default class CartItemService {
  #FREE_DELIVERY_PRICE = 100_000;
  #DELIVERY_FEE = 3_000;
  #FAR_DELIVERY_FEE = 6_000;

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
    if (this.calculateTotalPrice() >= this.#FREE_DELIVERY_PRICE) return 0;
    if (isFar) return this.#FAR_DELIVERY_FEE;
    return this.#DELIVERY_FEE;
  }

  calculateTotalPriceWithDeliveryFee(isFar: boolean) {
    return this.calculateTotalPrice() + this.calculateDeliveryFee(isFar);
  }
}
