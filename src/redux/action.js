import { requestTable } from '../api/request';
import { CUSTOMER_ID } from '../constants';
import { ADD_ITEM, DELETE_ITEMS, GET_MY_SHOPPING_CART } from './actionType';

const addShoppingCartItem = id => ({
  type: ADD_ITEM,
  productId: id,
});

const deleteShoppingCartItems = productIds => ({
  type: DELETE_ITEMS,
  productIds,
});

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

export { addShoppingCartItem, deleteShoppingCartItems, getMyShoppingCartAsync };
