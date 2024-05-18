import { URL } from '../../constants/constants';
import axiosInstance from '../../utils/axios';
import axios from 'axios';

const addToCart = async (productId: number) => {
  try {
    await axiosInstance.post(URL.CART_ITEMS, { productId: productId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 호출 중 오류 발생:', error.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
  }
};

export default addToCart;
