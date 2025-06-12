import { API_PATH } from "@/constants";
import { GetAllCouponsResponse } from "@/types";
import { baseApi } from "../baseApi";

export default class CouponApi {
  static async getAllCoupons(): Promise<GetAllCouponsResponse> {
    return baseApi.get(`${API_PATH.coupons}`);
  }
}
