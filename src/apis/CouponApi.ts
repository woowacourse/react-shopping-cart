import { API_PATH } from "@/constants";
import { GetCouponResponse } from "@/types";
import BaseApi from "./BaseApi";

interface GetCouponParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}

export default class CouponApi extends BaseApi {
  static async getAllCoupons({ page = 0, size = 20, sort = "asc" }: GetCouponParams = {}): Promise<GetCouponResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });
    return BaseApi.get(`${API_PATH.coupons}`);
  }
}
