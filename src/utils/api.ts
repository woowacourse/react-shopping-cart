import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';

export const API = {
  ADD_ONE_ITEM_IN_CART: async (products: Product[], id: Product['id']) => {
    try {
      const product = products.find(product => product.id === id);
      const response = await axios.post(URL.CART, { ...product, quantity: '1' });

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('상품을 장바구니에 담지 못했습니다.');
      }
      alert(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
    } catch (error) {
      console.error(error);
    }
  },
};
