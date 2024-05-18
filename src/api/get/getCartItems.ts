import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';
import { CartItem } from '../../types/cartItem';

interface PaginationParams {
  page: number;
  size: number;
}

const getCartItems = async (options: PaginationParams = { page: 0, size: 20 }) => {
  const response = await axiosInstance.get<Pageable<CartItem>>(URLS.CART_ITEMS, {
    params: options,
  });

  return response.data.content;
};

export default getCartItems;
