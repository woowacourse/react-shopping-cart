import { apiGet } from "../util/apiRequest";

const fetchCoupons = async () => {
  return apiGet("/coupons");
};

export default fetchCoupons;
