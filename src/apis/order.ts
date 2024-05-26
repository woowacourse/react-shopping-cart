import { fetchWithAuth } from "./utils/fetchClient";

/**
 * 주문 생성
 */
export const postOrders = async (selectedItemIds: number[]) => {
  await fetchWithAuth("/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ cartItemIds: selectedItemIds }),
  });
};
