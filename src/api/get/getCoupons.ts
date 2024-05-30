import axios from 'axios';
import { URL } from '../../constants/constants';
import axiosInstance from '../../utils/axios';

export interface Coupon {
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

const getCoupons = async () => {
  try {
    const response = await axiosInstance.get<Coupon[]>(URL.COUPON);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 호출 중 오류 발생:', error.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
    return [];
  }
};

export default getCoupons;
