import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';

const deleteCartItem = async (cartId: number) => {
  await axiosInstance.delete(API_URLS.DELETE_ITEMS(cartId));
};

export default deleteCartItem;
