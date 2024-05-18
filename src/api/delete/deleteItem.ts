import axiosInstance from '../../utils/axios';
import { URL } from '../../constants/constants';

const deleteItem = async (cartId: number) => {
  await axiosInstance.delete(URL.DELETE_ITEMS(cartId));
};

export default deleteItem;
