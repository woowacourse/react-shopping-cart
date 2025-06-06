import { Coupon } from "../../types/response/coupon";
import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "쿠폰 정보를 가져오는 데 실패했습니다.";

export const getCoupons = async (): Promise<Coupon[]> => {
  const params = new URLSearchParams({
    page: "0",
    size: "100",
    sort: "price,asc",
  });

  const response = await httpClient.get(`/coupons?${params.toString()}`);
  if (!response.ok) throw new Error(ERROR_MESSAGE);

  return await response.json();
};
