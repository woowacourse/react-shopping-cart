import { CouponType } from "@/types/coupon.type";
import { ENDPOINT } from "./config";
import { ERROR_MESSAGE } from "@/constants/error";
import fetchWithBasicToken from "./fetchWithBasicToken";

export async function getCouponList(): Promise<CouponType[]> {
  const response = await fetchWithBasicToken({
    method: "GET",
    endPoint: ENDPOINT.coupon.getList,
    errorMessage: ERROR_MESSAGE.getCouponList,
  });

  const data = await response.json();

  return data;
}
