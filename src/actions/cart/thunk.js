import {
  requestAddCart,
  requestGetCartList,
  requestRemoveCartItem,
  requestRemoveCartItemList,
  requestUpdateCartItem,
} from 'api/cart';
import { REQUEST_STATUS } from 'constants/';
import {
  addCartListAction,
  getCartListAction,
  updateCartItemSuccess,
  removeCartItemSuccess,
  removeCartItemListSuccess,
} from './action';

const getCartList = () => async (dispatch) => {
  dispatch(getCartListAction.pending());

  const { status, content } = await requestGetCartList();

  (status === REQUEST_STATUS.SUCCESS && dispatch(getCartListAction.success(content))) ||
    (status === REQUEST_STATUS.FAIL && dispatch(getCartListAction.error(content)));

  return true;
};

const addCartList =
  ({ id, image, name, price, quantity = 1 }) =>
  async (dispatch) => {
    dispatch(addCartListAction.pending());

    const { status, content } = await requestAddCart({
      id,
      image,
      name,
      price,
      quantity,
    });

    (status === REQUEST_STATUS.SUCCESS && dispatch(addCartListAction.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(addCartListAction.error(content)));

    return true;
  };

const updateCartItem = (id, changedContent) => async (dispatch) => {
  const { status, content } = await requestUpdateCartItem(id, changedContent);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(updateCartItemSuccess(content));
  return true;
};

const removeCartItem = (id) => async (dispatch) => {
  const { status } = await requestRemoveCartItem(id);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(removeCartItemSuccess(id));
  return true;
};

const removeCartItemList = (idList) => async (dispatch) => {
  const { status } = await requestRemoveCartItemList(idList);

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(removeCartItemListSuccess(idList));
  return true;
};

export { getCartList, addCartList, updateCartItem, removeCartItem, removeCartItemList };
