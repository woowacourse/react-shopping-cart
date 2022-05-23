import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartAsync,
  deleteCartProductAsync,
  getCartAsync,
  toggleProductCheck,
  updateCartProductQuantityAsync,
  updateCheckedList,
} from 'store/actions/cart';
import { cartStoreSelector } from 'store/selector';

import { WARNING_MESSAGES } from 'constants/messages';

const useCart = () => {
  const dispatch = useDispatch();
  const { cart, checkedProductList } = useSelector(cartStoreSelector);

  const cartLength = cart && Object.keys(cart).length;

  const loadCart = () => {
    dispatch(getCartAsync());
  };

  const addProductToCart = ({ id, count }) => {
    dispatch(addToCartAsync(id, count));
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

  const isChecked = (productId) => checkedProductList.includes(String(productId));

  const toggleCheck = (productId) => {
    dispatch(toggleProductCheck(String(productId)));
  };

  const isAllChecked = cartLength === checkedProductList.length;

  const toggleAllCheck = () => {
    if (isAllChecked) {
      dispatch(updateCheckedList([]));
      return;
    }

    dispatch(updateCheckedList(Object.keys(cart)));
  };

  const deleteCheckedProducts = () => {
    const checkedListLength = checkedProductList.length;

    if (
      checkedListLength !== 0 &&
      window.confirm(WARNING_MESSAGES.PRODUCTS_DELETE(checkedListLength))
    ) {
      dispatch(deleteCartProductAsync(checkedProductList));
    }
  };

  const checkedProductsTotalPrice = checkedProductList.reduce((total, productId) => {
    const { productData, quantity } = cart[productId];
    return total + productData.price * quantity;
  }, 0);

  return {
    cart,
    cartLength,
    loadCart,
    addProductToCart,
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
    checkedProductCount: checkedProductList.length,
    isAllChecked,
    toggleAllCheck,
    deleteCheckedProducts,
    totalPrice: checkedProductsTotalPrice,
  };
};

export default useCart;
