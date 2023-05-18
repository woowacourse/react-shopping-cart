import { Id } from "../types/Product";

export const fetchProducts = async () => {
  const response = await fetch("/api/products/");
  const data = await response.json();

  return data;
};

export const fetchCartItem = async () => {
  const response = await fetch("/api/cart-items/");
  const data = await response.json();

  return data;
};

export const addCartItem = async (id: Id) => {
  const response = await fetch(`/api/cart-items`, {
    method: "POST",
    headers: { "Contnet-Type": "application/json" },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const data = await response.json();

  return data;
};

export const patchCartItem = async (cartItemId: Id, quantity: number) => {
  const response = await fetch(`/api/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: { "Contnet-Type": "application/json" },
    body: JSON.stringify({
      quantity,
    }),
  });
  const data = await response.json();

  return data;
};

export const deleteCartItem = async (cartItemId: Id) => {
  const response = await fetch(`/api/cart-items/${cartItemId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};
