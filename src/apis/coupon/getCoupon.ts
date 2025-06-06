import { httpClient } from "../httpClient";
import { Coupon } from "./coupon.type";

const ERROR_MESSAGE = "쿠폰 정보를 가져오는 데 실패했습니다.";

export const getCoupon = async (): Promise<Coupon[]> => {
  const response = await httpClient.get("/coupons");
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data;
};
