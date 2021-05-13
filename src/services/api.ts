import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';
import { RESPONSE_MESSAGE } from '../constants/request';
import { confirm } from '../utils/confirm';

export const API = {
  ADD_ONE_ITEM_IN_CART: async (product: Product, id: Product['id']) => {
    try {
      const response = await axios.post(URL.CART, { ...product, quantity: '1' });

      if (response.status === STATUS_CODE.ALREADY_EXIST) {
        return RESPONSE_MESSAGE.ALREADY_EXIST;
      }

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        return RESPONSE_MESSAGE.FAILURE;
      }

      return RESPONSE_MESSAGE.SUCCESS;
    } catch (error) {
      console.error(error);
    }
  },
  CHANGE_ITEM_QUANTITY: async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    try {
      const response = await axios.patch(`${URL.CART}/${id}`, { quantity });

      if (response.status !== STATUS_CODE.PUT_SUCCESS) {
        throw new Error('상품 수량 변경에 실패하였습니다');
      }
    } catch (error) {
      console.error(error);
    }
  },
  DELETE_CART_ITEM: async (cartItems: CartItem[], id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);

    if (!confirm(`${newCartItems[targetIndex].name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const response = await axios.delete(`${URL.CART}/${id}`);

      if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
        throw new Error('장바구니 아이템 삭제에 실패하였습니다');
      }

      newCartItems.splice(targetIndex, 1);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  DELETE_SELECTED_CART_ITEMS: async (selectedCartItemIdList: String[]) => {
    try {
      selectedCartItemIdList.forEach(async id => {
        const response = await axios.delete(`${URL.CART}/${id}`);

        if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
          throw new Error('장바구니 아이템 삭제에 실패하였습니다');
        }
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  ORDER: async (orderItems: CartItem[]) => {
    try {
      const response = await axios.post(URL.ORDERS, { orderItems });

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('주문에 실패하였습니다.');
      }

      return true;
    } catch (error) {
      console.error(error);

      return false;
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

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};
