import { fetchCartItems, fetchProducts } from "../api";
import { MIN_QUANTITY } from "../constants";
import { ProductType, CartItemType } from "../types/domain";

export const getNewProducts = async () => {
  const products = await fetchProducts();
  const cartItems = await fetchCartItems();

  return products.map((product: ProductType) => {
    const cartProduct = cartItems.find(
      (cartItem: CartItemType) => cartItem.id === product.id
    );
    return {
      ...product,
      quantity: cartProduct ? cartProduct.quantity : MIN_QUANTITY,
    };
  });
};
