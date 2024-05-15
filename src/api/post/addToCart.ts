import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';

const addToCart = async (productId: number) => {
  await axiosInstance.post(URLS.CART_ITEMS, { productId: productId });
};

export default addToCart;
