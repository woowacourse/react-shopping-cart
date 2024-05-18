import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';
import { URL } from '../../constants/constants';

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
  const response = await axiosInstance.get<Pageable<CartItem>>(URL.CART_ITEMS, {
    params: {
      page: 0,
      size: 20,
    },
  });

  return response.data.content;
};

export default getItems;
