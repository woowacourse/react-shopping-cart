import { requestTable } from '../api/request';
import { CUSTOMER_ID } from '../constants';
import { GET_MY_SHOPPING_CART, UPDATE_MY_SHOPPING_CART_ITEMS } from './actionType';

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

export { updateShoppingCartItemsAsync, getMyShoppingCartAsync };
