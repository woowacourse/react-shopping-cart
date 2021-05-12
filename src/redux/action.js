import { requestTable } from '../api/request';
import { CUSTOMER_ID, SCHEMA } from '../constants';
import {
  ACTIVATE_LOADING_SPINNER,
  DEACTIVATE_LOADING_SPINNER,
  GET_MY_SHOPPING_CART,
  UPDATE_MY_SHOPPING_CART_ITEMS,
  UPDATE_PRODUCT_ITEMS,
} from './actionType';
import { store } from './store';

const activateLoading = () => ({
  type: ACTIVATE_LOADING_SPINNER,
});

const deactivateLoading = () => ({
  type: DEACTIVATE_LOADING_SPINNER,
});

const updateProductItemsAsync = () => async dispatch => {
  try {
    store.dispatch(activateLoading());
    const productItems = await requestTable.GET(SCHEMA.PRODUCT);

    dispatch({
      type: UPDATE_PRODUCT_ITEMS,
      productItems,
    });
  } catch (error) {
    console.log(error);
  } finally {
    store.dispatch(deactivateLoading());
  }
};

const updateShoppingCartItemsAsync = (targetId, content) => async dispatch => {
  try {
    store.dispatch(activateLoading());
    await requestTable.PUT(SCHEMA.SHOPPING_CART, targetId, content);

    dispatch({
      type: UPDATE_MY_SHOPPING_CART_ITEMS,
      productIdList: content.productIdList,
    });
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(deactivateLoading());
  }
};

const getMyShoppingCartAsync = () => async dispatch => {
  try {
    store.dispatch(activateLoading());
    const shoppingCartList = await requestTable.GET(SCHEMA.SHOPPING_CART);

    dispatch({
      type: GET_MY_SHOPPING_CART,
      myShoppingCart: shoppingCartList[CUSTOMER_ID],
    });
  } catch (error) {
    console.log(error);
  } finally {
    store.dispatch(deactivateLoading());
  }
};

export {
  activateLoading,
  deactivateLoading,
  updateShoppingCartItemsAsync,
  getMyShoppingCartAsync,
  updateProductItemsAsync,
};
