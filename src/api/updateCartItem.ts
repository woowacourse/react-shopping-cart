import { fetcher } from "./fetcher";

async function updateCartItem(cartItemId: number, quantity: number) {
  return fetcher(`/cart-items/${cartItemId}`, {
    method: "PATCH",
    body: {
      quantity,
    },
  });
}

export default updateCartItem;
