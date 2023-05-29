import { CartType } from "../type/cart";
import { client } from "./httpClient";

export async function getCartData() {
  return client.get<CartType[]>("carts", {});
}

export async function patchProductCount(cartItemId: number, quantity: number) {
  return await client.patch<Promise<Response>>(`cart-items/${cartItemId}`, {
    body: JSON.stringify({ quantity: quantity }),
  });
}

export async function postCartProduct(postData: CartType) {
  return client.post<Promise<Response>>("cart-items", {
    body: JSON.stringify({ postData: postData }),
  });
}

export async function deleteCartProduct(cartItemId: number[]) {
  return client.delete<Promise<Response>>("cart-items", {
    body: JSON.stringify({ cartItemId }),
  });
}
