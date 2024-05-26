import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';

const addToCart = async (productId: number) => {
  await axiosInstance.post(API_URLS.CART_ITEMS, { productId: productId });
};

export default addToCart;
