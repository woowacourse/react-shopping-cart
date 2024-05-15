import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';

const deleteItem = async (cartId: number) => {
  await axiosInstance.delete(URLS.DELETE_ITEMS(cartId));
};

export default deleteItem;
