import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartProductAsync,
  getCartAsync,
  updateCartProductQuantityAsync,
} from 'store/actions/cart';
import { cartObjectSelector } from 'store/selector';

const MINIMUM_QUANTITY_WARNING_MESSAGE = '주문할 수 있는 최소 수량입니다.';
const PRODUCT_DELETE_WARNING = '상품을 장바구니에서 삭제하시겠습니까?';

const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartObjectSelector);

  const cartLength = cart && Object.keys(cart).length;

  const loadCart = () => {
    dispatch(getCartAsync());
  };

  const dispatchQuantityUpdate = (productId, quantity) => {
    dispatch(updateCartProductQuantityAsync(productId, quantity));
  };

  const decrementCartProduct = (productId, currentQuantity) => {
    if (currentQuantity === 1) {
      alert(MINIMUM_QUANTITY_WARNING_MESSAGE);
      return;
    }
    dispatchQuantityUpdate(productId, currentQuantity - 1);
  };

  const incrementCartProduct = (productId, currentQuantity) => {
    dispatchQuantityUpdate(productId, currentQuantity + 1);
  };

  const deleteProduct = (productIdArray) => {
    if (window.confirm(PRODUCT_DELETE_WARNING)) {
      dispatch(deleteCartProductAsync(productIdArray));
    }
  };

  return {
    cart,
    cartLength,
    loadCart,
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
  };
};

export default useCart;
