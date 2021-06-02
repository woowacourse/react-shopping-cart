import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';
import { CartItemData } from '../type';

export const requestDeleteCartItem = async (id: string) => {
  const response = await axios.delete(`${URL.CART}/${id}`);
  if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
    throw Error('상품을 장바구니에서 삭제하지 못했습니다.');
  }
};

export const requestDeleteCartItems = async (idList: Array<string>) => {
  const responseList = await Promise.all(
    idList.map(id => {
      return axios.delete(`${URL.CART}/${id}`);
    })
  );

  if (responseList.every(response => response.status !== STATUS_CODE.DELETE_SUCCESS)) {
    throw Error('모든 상품을 장바구니에서 삭제하지 못했습니다.');
  }
};

export const requestGetCartItems = async () => {
  const response = await axios.get<CartItemData[]>(URL.CART);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw Error('장바구니 정보를 불러오지 못했습니다.');
  }

  return response;
};
