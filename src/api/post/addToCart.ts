import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';

const addToCart = async (productId: number) => {
  try {
    await axiosInstance.post(API_URLS.CART_ITEMS, { productId: productId });
    alert(`${productId} 등록완료`);
  } catch (error) {
    alert('장바구니 등록 실패');
  }
};

export default addToCart;
