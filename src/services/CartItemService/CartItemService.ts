import { DELIVERY_FEE, FAR_DELIVERY_FEE, FREE_DELIVERY_PRICE } from "@/constants";
import { CartItem } from "@/types";

export default class CartItemService {
  constructor(private readonly cartItems: CartItem[] = []) {}

  calculateOrderAmount() {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  }

  calculateTotalQuantity() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  calculateTypeCount() {
    return this.cartItems.length;
  }

  calculateDeliveryFee(isFar: boolean) {
    if (this.calculateOrderAmount() >= FREE_DELIVERY_PRICE) return 0;
    if (isFar) return FAR_DELIVERY_FEE;
    return DELIVERY_FEE;
  }

  calculateOrderAmountWithDeliveryFee(isFar: boolean) {
    return this.calculateOrderAmount() + this.calculateDeliveryFee(isFar);
  }
}
