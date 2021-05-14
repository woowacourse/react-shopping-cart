import axios from 'axios';
import { STATUS_CODE, URL, RESPONSE_RESULT } from '../constants';

export const API = {
  ADD_ONE_ITEM_IN_CART: async (product: Product, qunatity?: CartItem['quantity']) => {
    try {
      const response = await axios.post(URL.CART, { ...product, quantity: qunatity ? qunatity : '1' });

      if (response.status === STATUS_CODE.ALREADY_EXIST) {
        return RESPONSE_RESULT.ALREADY_EXIST;
      }

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        return RESPONSE_RESULT.FAILURE;
      }

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
  CHANGE_ITEM_QUANTITY: async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    try {
      const response = await axios.patch(`${URL.CART}/${id}`, { quantity });

      if (response.status !== STATUS_CODE.PUT_SUCCESS) {
        return RESPONSE_RESULT.FAILURE;
      }

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
  DELETE_CART_ITEM: async (id: CartItem['id']) => {
    try {
      const response = await axios.delete(`${URL.CART}/${id}`);

      if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
        return RESPONSE_RESULT.FAILURE;
      }

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
  DELETE_SELECTED_CART_ITEMS: async (selectedCartItemIdList: String[]) => {
    try {
      selectedCartItemIdList.forEach(async id => {
        const response = await axios.delete(`${URL.CART}/${id}`);

        if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
          throw new Error('상품을 장바구니에서 삭제하는데 실패하였습니다.');
        }
      });

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
  ORDER: async (orderItems: CartItem[]) => {
    try {
      const response = await axios.post(URL.ORDERS, { orderItems });

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        return RESPONSE_RESULT.FAILURE;
      }

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
  DELETE_ORDER_ITEMS_IN_CART: async (orderItems: CartItem[]) => {
    try {
      orderItems.forEach(async item => {
        const response = await axios.delete(`${URL.CART}/${item.id}`);

        if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
          throw new Error('장바구니 아이템 삭제에 실패하였습니다');
        }
      });

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      console.error(error);
      return RESPONSE_RESULT.FAILURE;
    }
  },
};
