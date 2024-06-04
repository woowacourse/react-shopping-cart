import apiClient from "./apiClient";

export interface Orders {
  cartItemIds: number[];
}

export const postOrders = (body: Orders): Promise<boolean> => {
  return apiClient.post("/orders", body);
};
