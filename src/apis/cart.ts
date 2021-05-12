import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';

export const requestCartItemQuantityPatch = async (id: CartItem['id'], quantity: CartItem['quantity']) => {
  const response = await axios.patch(`${URL.CART}/${id}`, { quantity });
  if (response.status !== STATUS_CODE.PUT_SUCCESS) {
    throw { status: response.status };
  }
};

export const requestCartItemDelete = async (id: CartItem['id']) => {
  const response = await axios.delete(`${URL.CART}/${id}`);
  if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
    throw { status: response.status };
  }
};

export const requestCartItemsDelete = async (idList: Array<CartItem['id']>) => {
  const responseList = await Promise.all(
    idList.map(id => {
      return axios.delete(`${URL.CART}/${id}`);
    })
  );
  if (responseList.every(response => response.status !== STATUS_CODE.DELETE_SUCCESS)) {
    throw { statusList: responseList.map(response => response.status) };
  }
};
