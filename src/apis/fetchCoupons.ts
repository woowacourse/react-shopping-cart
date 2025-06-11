import { apiGet } from "./apiRequest";

const fetchCoupons = async () => {
  return apiGet("/coupons");
};

export default fetchCoupons;
