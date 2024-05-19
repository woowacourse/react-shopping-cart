import axios from 'axios';
import axiosInstance from '../../utils/axios';
import { URL } from '../../constants/constants';

const deleteItem = async (cartId: number) => {
  try {
    await axiosInstance.delete(URL.DELETE_ITEMS(cartId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 호출 중 오류 발생:', error.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
  }
};

export default deleteItem;
