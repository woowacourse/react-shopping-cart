import { requestTable } from '../api/request';
import { SCHEMA } from '../constants';
import {
  ADD_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEMS,
  GET_MY_SHOPPING_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
} from './actionType';

const addShoppingCartItemAsync = newContent => async (dispatch, getState) => {
  try {
    const currentProductIds = getState().myShoppingCartReducer.myShoppingCart.map(item => item.product_id);

    if (currentProductIds.includes(newContent.product_id)) return;

    const newCartId = await requestTable.POST('carts', newContent);
    const newItem = await requestTable.GET('products', newContent.product_id);

    dispatch({
      type: ADD_SHOPPING_CART_ITEM,
      newItem: { cart_id: newCartId, ...newItem },
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteShoppingCartItemAsync = targetCartId => async dispatch => {
  try {
    await requestTable.DELETE('carts', targetCartId);

    dispatch({
      type: DELETE_SHOPPING_CART_ITEM,
      targetCartId,
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
    const shoppingCartList = await requestTable.GET('carts');

    dispatch({
      type: GET_MY_SHOPPING_CART,
      myShoppingCart: shoppingCartList,
    });
  } catch (error) {
    console.error(error);
  }
};

const increaseAmount = targetId => dispatch => {
  dispatch({
    type: INCREASE_AMOUNT,
    targetId,
  });
};

const decreaseAmount = targetId => dispatch => {
  dispatch({
    type: DECREASE_AMOUNT,
    targetId,
  });
};

export {
  addShoppingCartItemAsync,
  deleteShoppingCartItemAsync,
  deleteCheckedShoppingCartItemAsync,
  getMyShoppingCartAsync,
  increaseAmount,
  decreaseAmount,
};
