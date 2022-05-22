import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartAsync,
  deleteCartProductAsync,
  getCartAsync,
  updateCartProductQuantityAsync,
} from 'store/actions/cart';
import { cartObjectSelector } from 'store/selector';

import { ALERT_MESSAGES, WARNING_MESSAGES } from 'constants/messages';

const useCartProducts = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartObjectSelector);

  const cartLength = cart && Object.keys(cart).length;

  const loadCart = () => {
    dispatch(getCartAsync());
  };

  const addProductToCart = ({ id, name, count }) => {
    dispatch(addToCartAsync(id, count));
    alert(`${name}: ${ALERT_MESSAGES.PRODUCT_ADDED(count)} `);
  };

  const dispatchQuantityUpdate = (productId, quantity) => {
    dispatch(updateCartProductQuantityAsync(productId, quantity));
  };

  const incrementCartProduct = (productId, currentQuantity) => {
    dispatchQuantityUpdate(productId, currentQuantity + 1);
  };

  const decrementCartProduct = (productId, currentQuantity) => {
    if (currentQuantity === 1) {
      alert(WARNING_MESSAGES.MIN_QUANTITY);
      return;
    }
    dispatchQuantityUpdate(productId, currentQuantity - 1);
  };

  const deleteProduct = (productIdArray) => {
    if (window.confirm(WARNING_MESSAGES.PRODUCT_DELETE)) {
      dispatch(deleteCartProductAsync(productIdArray));
    }
  };

  return {
    cart,
    cartLength,
    loadCart,
    addProductToCart,
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
  };
};

export default useCartProducts;
