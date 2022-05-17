import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartProductAsync,
  toggleProductCheck,
  updateCheckedList,
} from '../store/actions/cart';

const useCartCheckedProducts = () => {
  const dispatch = useDispatch();
  const { cart, checkedProductList } = useSelector(({ cart }) => cart);
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
      window.confirm(`${checkedListLength}개의 상품을 삭제하시겠습니까?`)
    ) {
      dispatch(deleteCartProductAsync(checkedProductList));
    }
  };

  return {
    isChecked,
    toggleCheck,
    checkedProductCount: checkedProductList.length,
    isAllChecked,
    toggleAllCheck,
    deleteCheckedProducts,
  };
};

export default useCartCheckedProducts;
