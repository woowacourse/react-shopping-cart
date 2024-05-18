import axiosInstance from '../../utils/axios';
import { URL } from '../../constants/constants';

const addToCart = async (productId: number) => {
  await axiosInstance.post(URL.CART_ITEMS, { productId: productId });
};

export default addToCart;
