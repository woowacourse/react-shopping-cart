import { API_URLS } from '../../constants/constants';
import { Coupon } from '../../type/coupon';
import axiosInstance from '../../utils/axios';

const getCoupons = async () => {
  const response = await axiosInstance.get<Coupon[]>(API_URLS.COUPONS);
  return response.data;
};

export default getCoupons;
