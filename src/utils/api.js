import axios from 'axios';
import { LOCAL_URL } from 'constants/constants';

export const getProductList = async () => {
  try {
    const response = await axios.get(LOCAL_URL + 'products');

    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const getShoppingCartList = async () => {
  try {
    const response = await axios.get(LOCAL_URL + 'shoppingCart');

    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const putProductItem = async productItem => {
  try {
    axios({
      method: 'put',
      url: LOCAL_URL + `products/${productItem.id}`,
      data: productItem,
    });
  } catch (error) {
    alert(error);
  }
};

export const putShoppingCartItem = async shoppingCartItem => {
  try {
    axios({
      method: 'post',
      url: LOCAL_URL + `shoppingCart`,
      data: shoppingCartItem,
    });
  } catch (error) {
    alert(error);
  }
};

export const postShoppingCartItem = async shoppingCartItem => {
  try {
    axios({
      method: 'put',
      url: LOCAL_URL + `shoppingCart/${shoppingCartItem.id}`,
      data: shoppingCartItem,
    });
  } catch (error) {
    alert(error);
  }
};

export const deleteShoppingCartItem = async shoppingCartItem => {
  try {
    axios({
      method: 'delete',
      url: LOCAL_URL + `shoppingCart/${shoppingCartItem.id}`,
      data: shoppingCartItem,
    });
  } catch (error) {
    alert(error);
  }
};
