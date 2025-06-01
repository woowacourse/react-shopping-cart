import { http, HttpResponse } from "msw";
import MOCKING_CART_ITEMS_DATA from "../data/cartItems.json";
import { CartItem, GetCartItemsResponse } from "../../../types/cartItem";

const BASE_URL = import.meta.env.VITE_API_URL;

const cartItems: GetCartItemsResponse = { ...MOCKING_CART_ITEMS_DATA }; // 초기 데이터 복사

const getCartItems = http.get(`${BASE_URL}/cart-items`, () => {
  return HttpResponse.json(cartItems);
});

const patchCartItems = http.patch(`${BASE_URL}/cart-items/:id`, async ({ params, request }) => {
  const cartItemId = Number(params.id);
  const { quantity } = (await request.json()) as { quantity: number };
  const currentCartItem = cartItems.content.find((cartItem) => cartItem.id === cartItemId);

  if (quantity > currentCartItem!.product.quantity!) {
    return HttpResponse.json({ message: "재고 수량을 초과하여 담을 수 없습니다." }, { status: 400 });
  }

  cartItems.content = cartItems.content.reduce((acc, item) => {
    if (item.id === cartItemId) {
      if (quantity !== 0) {
        acc.push({ ...item, quantity });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as CartItem[]);

  return HttpResponse.json({ message: "Patch" }, { status: 200 });
});

const deleteCartItems = http.delete(`${BASE_URL}/cart-items/:id`, async ({ params }) => {
  const cartItemId = Number(params.id);
  cartItems.content = cartItems.content.filter((item) => item.id !== cartItemId);

  return HttpResponse.json({ message: "Delete" }, { status: 200 });
});

export default [getCartItems, patchCartItems, deleteCartItems];
