import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';

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

const getCartItems = async () => {
  const response = await axiosInstance.get<Pageable<CartItem>>(URLS.CART_ITEMS, {
    params: {
      page: 0,
      size: 20,
    },
  });

  return response.data.content;
};

export default getCartItems;
