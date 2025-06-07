import { Coupon } from "../types/response";
import { httpClient } from "../../../apis/httpClient";

const ERROR_MESSAGE = "쿠폰 정보를 가져오는 데 실패했습니다.";

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await httpClient.get(`/coupons`);
  if (!response.ok) throw new Error(ERROR_MESSAGE);

  return await response.json();
};
