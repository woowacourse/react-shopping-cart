import { requestTable } from '../api/request';
import { CUSTOMER_ID, SCHEMA } from '../constants';
import {
  ADD_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEMS,
  GET_MY_SHOPPING_CART,
} from './actionType';

const addShoppingCartItemAsync = newProductId => async (dispatch, getState) => {
  const { id, productIdList } = getState().myShoppingCartReducer.myShoppingCart;

  try {
    const newContent = { productIdList: [...new Set([...productIdList, newProductId])] };

    await requestTable.PUT(SCHEMA.SHOPPING_CART, id, newContent);

    dispatch({
      type: ADD_SHOPPING_CART_ITEM,
      newProductId,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteShoppingCartItemAsync = targetId => async (dispatch, getState) => {
  const { id, productIdList } = getState().myShoppingCartReducer.myShoppingCart;

  try {
    const newContent = { productIdList: productIdList.filter(productId => productId !== targetId) };

    await requestTable.PUT(SCHEMA.SHOPPING_CART, id, newContent);

    dispatch({
      type: DELETE_SHOPPING_CART_ITEM,
      targetId,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteCheckedShoppingCartItemAsync = checkedIdList => async (dispatch, getState) => {
  const { id, productIdList } = getState().myShoppingCartReducer.myShoppingCart;

  try {
    const newContent = {
      productIdList: productIdList.filter(productId => !checkedIdList.includes(productId)),
    };
    await requestTable.PUT(SCHEMA.SHOPPING_CART, id, newContent);

    dispatch({
      type: DELETE_SHOPPING_CART_ITEMS,
      checkedIdList,
    });
  } catch (error) {
    console.error(error);
  }
};

const getMyShoppingCartAsync = () => async dispatch => {
  try {
    const shoppingCartList = await requestTable.GET(SCHEMA.SHOPPING_CART);

    dispatch({
      type: GET_MY_SHOPPING_CART,
      myShoppingCart: shoppingCartList[CUSTOMER_ID],
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  addShoppingCartItemAsync,
  deleteShoppingCartItemAsync,
  deleteCheckedShoppingCartItemAsync,
  getMyShoppingCartAsync,
};
