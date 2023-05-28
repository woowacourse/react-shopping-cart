import { fetchCartItems } from "../api";
import { MIN_QUANTITY } from "../constants";
import { CartItemType, PayloadType, ProductType } from "../types/domain";

export const getNewProducts = async (products: PayloadType[]) => {
  const cartItems = await fetchCartItems();
  console.log("cartItems ", cartItems);

  return products.map((product: PayloadType): ProductType => {
    const cartProduct = cartItems.find(
      (cartItem: CartItemType) => cartItem.id === product.id
    );
    return {
      ...product,
      quantity: cartProduct ? cartProduct.quantity : MIN_QUANTITY,
    };
  });
};
