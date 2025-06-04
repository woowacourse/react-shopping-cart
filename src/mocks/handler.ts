import { http, HttpResponse } from "msw";
import rawCartItems from "./cartItems.json";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let cartItems = [...rawCartItems];

const getCartItems = () => {
  return HttpResponse.json({ content: cartItems });
};

const updateCartItemQuantity = async ({ params, request }) => {
  const id = Number(params.id);
  const body = await request.json();
  const { quantity } = body as { quantity: number };

  const itemIndex = cartItems.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = quantity;
  }
  return HttpResponse.json({ message: "장바구니 아이템이 변경되었습니다." });
};

const deleteCartItem = ({ params }) => {
  const id = Number(params.id);
  cartItems = cartItems.filter((item) => item.id !== id);
  return new HttpResponse({});
};

export const handlers = [
  http.get(`${BASE_URL}/cart-items*`, getCartItems),
  http.patch(`${BASE_URL}/cart-items/:id`, updateCartItemQuantity),
  http.delete(`${BASE_URL}/cart-items/:id`, deleteCartItem),
];
