import { apiClient } from "./apiClient";
import { Coupon } from "../type/Coupons";

const fetchCoupons = async () => {
  const data = await apiClient.get<Coupon[]>({
    endpoint: "/coupons",
  });

  return data;
};

export default fetchCoupons;
