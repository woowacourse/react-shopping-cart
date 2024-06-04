import { ENDPOINT } from "./config";
import { ERROR_MESSAGE } from "@/constants/error";
import fetchWithBasicToken from "./fetchWithBasicToken";

export async function postOrders(cartItemIds: number[]): Promise<void> {
  await fetchWithBasicToken({
    method: "POST",
    endPoint: ENDPOINT.order.postOrders,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemIds }),
    errorMessage: ERROR_MESSAGE.postOrders,
  });
}
