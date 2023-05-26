import { Product } from "types/domain";

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch("/cart-items", {
    method: "GET",
  });

  return response.json();
};

export const addCartItem = async (productId: number) => {
  const response = await fetch("/cart-items", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
  });

  return response.status === 201;
};

export const changeItemQuantity = async (productId: number, quantity: number) => {
  const response = await fetch(`/cart-items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity: Number(quantity) }),
  });

  return response.status === 200;
};

export const removeCartItem = async (productId: number) => {
  const response = await fetch(`/cart-items/${productId}`, {
    method: "DELETE",
  });

  return response.status === 204;
};
