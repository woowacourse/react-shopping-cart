import axios from 'axios';
import { URL } from '../../constants/constants';
import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const getItems = async () => {
  try {
    const response = await axiosInstance.get<Pageable<CartItem>>(URL.CART_ITEMS, {
      params: {
        page: 0,
        size: 20,
      },
    });
    return response.data.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 호출 중 오류 발생:', error.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
    }
    return [];
  }
};

export default getItems;
