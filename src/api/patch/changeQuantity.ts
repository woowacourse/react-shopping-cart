import { URL } from '../../constants/constants';
import axiosInstance from '../../utils/axios';
import axios from 'axios';

export interface QuantityParams {
  id: number;
  quantity: number;
}

const changeQuantity = async ({ id, quantity }: QuantityParams) => {
  try {
    await axiosInstance.patch(URL.QUANTITY_TO_CHANGE(id), { quantity });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 호출 중 오류 발생:', error.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
  }
};

export default changeQuantity;
