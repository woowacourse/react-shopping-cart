import {
  requestAddCart,
  requestGetCartList,
  requestRemoveCartItem,
  requestRemoveCartItemList,
  requestUpdateCartItem,
} from 'api/cart';
import { REQUEST_STATUS } from 'constants/';

import * as cartActions from './action';

const getList =
  (force = false) =>
  async (dispatch, getState) => {
    const { isLoading, isLoaded } = getState().cart.items;
    if (force === false && (isLoading || isLoaded === true)) {
      return;
    }

    dispatch(cartActions.getList.pending());

    const { status, content } = await requestGetCartList();

    (status === REQUEST_STATUS.SUCCESS && dispatch(cartActions.getList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(cartActions.getList.error(content)));

    return true;
  };

const addList =
  ({ id, image, name, price, quantity = 1 }) =>
  async (dispatch) => {
    dispatch(cartActions.addList.pending());

    const { status, content } = await requestAddCart({
      id,
      image,
      name,
      price,
      quantity,
    });

    (status === REQUEST_STATUS.SUCCESS && dispatch(cartActions.addList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(cartActions.addList.error(content)));

    return true;
  };

const updateItem = (id, changedContent) => async (dispatch) => {
  const { status, content } = await requestUpdateCartItem(id, changedContent);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.updateItemSuccess(content));
  return true;
};

const removeItem = (id) => async (dispatch) => {
  const { status } = await requestRemoveCartItem(id);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemSuccess(id));
  return true;
};

const removeItemList = (idList) => async (dispatch) => {
  const { status } = await requestRemoveCartItemList(idList);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemListSuccess(idList));
  return true;
};

export { getList, addList, updateItem, removeItem, removeItemList };
