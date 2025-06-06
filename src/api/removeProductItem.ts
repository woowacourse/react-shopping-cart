import { fetcher } from "./fetcher";

async function removeProductItem(productId: number) {
  return fetcher(`/cart-items/${productId}`, {
    method: "DELETE",
  });
}

export default removeProductItem;
