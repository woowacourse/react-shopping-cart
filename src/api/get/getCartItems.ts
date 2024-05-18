import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';
import { CartItem } from '../../types/cartItem';

interface PaginationParams {
  page: number;
  size: number;
}

const getCartItems = async (options: PaginationParams = { page: 0, size: 20 }) => {
  const response = await axiosInstance.get<Pageable<CartItem>>(API_URLS.CART_ITEMS, {
    params: options,
  });

  return response.data.content;
};

export default getCartItems;
