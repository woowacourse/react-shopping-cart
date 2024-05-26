import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';

const orderItems = async (cartItemIds: number[]) => {
  await axiosInstance.post(API_URLS.ORDERS, { cartItemIds });
};

export default orderItems;
