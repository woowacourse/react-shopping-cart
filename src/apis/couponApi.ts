import apiClient from "./apiClient";

export type GetCouponsResponse = GetCouponResponse[];

export interface GetCouponResponse {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
}

export interface AvailableTime {
  start: string;
  end: string;
}
const couponApi = {
  get: async (): Promise<GetCouponsResponse> => {
    return apiClient({ url: `/coupons`, options: { method: "GET" } });
  },
};

export default couponApi;
