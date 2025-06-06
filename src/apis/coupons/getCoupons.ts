import { Coupon } from "../../types/response";
import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "쿠폰 정보를 가져오는 데 실패했습니다.";

export const getCoupons = async (): Promise<Coupon[]> => {
  try {
    const data = await httpClient.get(`/coupons`);
    return data;
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};
