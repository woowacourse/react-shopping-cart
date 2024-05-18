import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';

const deleteCartItem = async (cartId: number) => {
  await axiosInstance.delete(URLS.DELETE_ITEMS(cartId));
};

export default deleteCartItem;
