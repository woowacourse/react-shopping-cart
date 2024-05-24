import { API_PATH } from "../constants/apiPath";
import { cartApiClient } from "./cartApiClient";

export const createOrder = async (cartItemIds: number[]) => {
  const res = await cartApiClient.post<void>(API_PATH.orders, { cartItemIds });
  return res.data;
};
