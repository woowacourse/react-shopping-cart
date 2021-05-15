import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';
import { CartItemData } from '../type';

export const requestDeleteCartItem = async (id: string) => {
  const response = await axios.delete(`${URL.CART}/${id}`);
  if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
    throw { status: response.status };
  }
};

export const requestDeleteCartItems = async (idList: Array<string>) => {
  const responseList = await Promise.all(
    idList.map(id => {
      return axios.delete(`${URL.CART}/${id}`);
    })
  );

  console.log('responseList', responseList);

  if (responseList.every(response => response.status !== STATUS_CODE.DELETE_SUCCESS)) {
    throw { statusList: responseList.map(response => response.status) };
  }
};

export const requestGetCartItems = async () => {
  const response = await axios.get<CartItemData[]>(URL.CART);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw { status: response.status };
  }

  return response;
};
