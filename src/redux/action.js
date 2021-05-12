import { requestTable } from '../api/request';
import { CUSTOMER_ID } from '../constants';
import {
  ACTIVATE_LOADING_SPINNER,
  DEACTIVATE_LOADING_SPINNER,
  GET_MY_SHOPPING_CART,
  UPDATE_MY_SHOPPING_CART_ITEMS,
} from './actionType';

const activateLoading = () => ({
  type: ACTIVATE_LOADING_SPINNER,
});

const deactivateLoading = () => ({
  type: DEACTIVATE_LOADING_SPINNER,
});

const updateShoppingCartItemsAsync = (schema, targetId, content) => async dispatch => {
  try {
    await requestTable.PUT(schema, targetId, content);

    dispatch({
      type: UPDATE_MY_SHOPPING_CART_ITEMS,
      productIdList: content.productIdList,
    });
  } catch (error) {
    console.error(error);
  }
};

const getMyShoppingCartAsync = schema => async dispatch => {
  try {
    const shoppingCartList = await requestTable.GET(schema);

    dispatch({
      type: GET_MY_SHOPPING_CART,
      myShoppingCart: shoppingCartList[CUSTOMER_ID],
    });
  } catch (error) {
    console.log(error);
  }
};

export { activateLoading, deactivateLoading, updateShoppingCartItemsAsync, getMyShoppingCartAsync };
