import { Pageable } from '../../types/pageable';
import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';
import { CartItem } from '../../types/cartItem';

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
