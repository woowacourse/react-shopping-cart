import { apiClient } from "./apiClient";

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}

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
