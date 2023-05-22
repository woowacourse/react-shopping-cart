import { CartType } from "../type/cart";

export async function getCartData() {
  const response = await fetch("/carts");
  if (!response.ok) {
    throw Error(response.status.toString());
  }
  const data = await response.json();
  return data;
}

export async function patchProductCount(cartItemId: number, quantity: number) {
  const response = await fetch(`cart-items/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    throw Error(response.status.toString());
  }

  return response;
}

export async function postCartProduct(postData: CartType) {
  const response = await fetch(`cart-items`, {
    method: "POST",
    body: JSON.stringify({
      postData: postData,
    }),
  });

  if (!response.ok) {
    throw Error(response.status.toString());
  }

  return response;
}

export async function deleteCartProduct(cartItemId: number[]) {
  const response = await fetch(`cart-items`, {
    method: "DELETE",
    body: JSON.stringify({ cartItemId }),
  });

  if (!response.ok) {
    throw Error(response.status.toString());
  }

  return response;
}
