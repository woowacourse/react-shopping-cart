import { addToCart, deleteCartProduct, getCart, updateCartProductQuantity } from '../../api/api';
import { cartActionType } from '../reducers/cart';

const handleCartDispatch = async ({ dispatch, func, params = [] }) => {
  dispatch({ type: cartActionType.START });

  try {
    const { cart } = await func(...params);
    dispatch({ type: cartActionType.UPDATE, payload: { cart } });
  } catch ({ message }) {
    dispatch({ type: cartActionType.FAIL, payload: { message } });
  }
};

export const addToCartAsync = (productId, quantity) => async (dispatch) => {
  handleCartDispatch({ dispatch, func: addToCart, params: [productId, quantity] });
};

export const getCartAsync = () => async (dispatch) => {
  handleCartDispatch({ dispatch, func: getCart });
};

export const updateCartProductQuantityAsync = (productId, quantity) => async (dispatch) => {
  handleCartDispatch({ dispatch, func: updateCartProductQuantity, params: [productId, quantity] });
};

export const deleteCartProductAsync = (productIdArray) => async (dispatch) => {
  handleCartDispatch({ dispatch, func: deleteCartProduct, params: [productIdArray] });
};

export const toggleProductCheck = (productId) => (dispatch, getState) => {
  const {
    cart: { checkedProductList: prevList },
  } = getState();

  const idIndex = prevList.findIndex((id) => id === productId);
  let newArray =
    idIndex >= 0
      ? [...prevList.slice(0, idIndex), ...prevList.slice(idIndex + 1)]
      : [...prevList, productId];

  dispatch(updateCheckedList(newArray));
};

export const updateCheckedList = (checkedProductList) => ({
  type: cartActionType.UPDATE_CHECKED_LIST,
  payload: { checkedProductList },
});
