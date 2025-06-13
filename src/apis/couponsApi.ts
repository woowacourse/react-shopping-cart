import { Coupon } from "../types/type";
import { apiClient } from "./apiClient";

const couponsApi = {
  get: async (): Promise<Coupon[]> => {
    try {
      const response = await apiClient({
        endpoint: `/coupons`,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      throw error;
    }
  },
};

export default couponsApi;
