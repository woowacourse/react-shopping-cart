import { fetcher } from "./fetcher";

async function removeProductItemApi(productId: number) {
  return fetcher(`/cart-items/${productId}`, {
    method: "DELETE",
  });
}

export default removeProductItemApi;
