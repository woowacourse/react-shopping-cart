import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartProductAsync,
  toggleProductCheck,
  updateCheckedList,
} from 'store/actions/cart';
import { cartStoreSelector } from 'store/selector';

import { WARNING_MESSAGES } from 'constants/messages';

const useCartCheck = () => {
  const dispatch = useDispatch();
  const { cart, checkedProductList } = useSelector(cartStoreSelector);
  const cartLength = useMemo(() => cart && Object.keys(cart).length, [cart]);

  const isChecked = (productId) => checkedProductList.includes(String(productId));

  const toggleCheck = (productId) => {
    dispatch(toggleProductCheck(String(productId)));
  };

  const isAllChecked = useMemo(
    () => cartLength === checkedProductList.length,
    [cartLength, checkedProductList],
  );

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
    isChecked,
    toggleCheck,
    checkedProductCount: checkedProductList.length,
    isAllChecked,
    toggleAllCheck,
    deleteCheckedProducts,
    totalPrice: checkedProductsTotalPrice,
  };
};

export default useCartCheck;
