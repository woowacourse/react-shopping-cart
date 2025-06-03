import { API_PATH } from "@/constants";
import { GetAllCouponsResponse } from "@/types";
import BaseApi from "./BaseApi";

export default class CouponApi extends BaseApi {
  static async getAllCoupons(): Promise<GetAllCouponsResponse> {
    return BaseApi.get(`${API_PATH.coupons}`);
  }
}
