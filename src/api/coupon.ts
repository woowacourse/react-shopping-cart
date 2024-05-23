import { generateBasicToken } from "../utils/auth";
import { API_URL, USER_ID, USER_PASSWORD } from "../constants/cart";
import { Coupon } from "../types/coupon";

export const getCoupons = async (): Promise<Coupon[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/coupons`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to get cart items");
  }

  const data = await response.json();
  return data;
};
