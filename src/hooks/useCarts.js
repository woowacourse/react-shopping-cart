import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ACTION_TYPE, ROUTE } from '../constants';
import {
  fetchCarts,
  deleteCartItem,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
} from '../service/carts';
import { formatPrice } from '../utils';

const useCarts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartItems = useSelector(state => state.cart.cart.cartItems);
  const isCheckedAll = cartItems.every(({ isChecked }) => isChecked);

  const checkedItems = cartItems.filter(({ isChecked }) => isChecked);

  const getTotalPrice = products => {
    return products.reduce((totalPrice, { price, quantity, isChecked }) => {
      return isChecked ? (totalPrice += price * quantity) : totalPrice;
    }, 0);
  };

  const getTotalQuantity = products => {
    return products.reduce((totalQuantity, { quantity, isChecked }) => {
      return isChecked ? (totalQuantity += quantity) : totalQuantity;
    }, 0);
  };

  const totalQuantity = getTotalQuantity(cartItems);

  const formattedTotalPrice = formatPrice(getTotalPrice(cartItems));

  const orderButtonText =
    totalQuantity === 0
      ? '상품을 담아주세요🤍'
      : `주문하기 (${totalQuantity}개)`;

  const updateCarts = () => dispatch(fetchCarts());
  const updateIncreaseQuantity = id => dispatch(handleIncreaseQuantity(id));
  const updateDecreaseQuantity = id => dispatch(handleDecreaseQuantity(id));

  const routeToOrderPayment = () => {
    if (cartItems.length > 0) {
      history.push(ROUTE.ORDER_PAYMENT);
    }
  };

  const updateCartURL = () =>
    dispatch({ type: ACTION_TYPE.URL.GET_URL, payload: ROUTE.CART });

  const toggleOneCheckBox = id => {
    dispatch({ type: ACTION_TYPE.PRODUCTS.TOGGLE_CHECKED, id });
  };

  const toggleAllCheckBox = () => {
    dispatch({
      type: ACTION_TYPE.PRODUCTS.TOGGLE_ENTIRE_CHECKED,
      isChecked: isCheckedAll,
    });
  };

  const deleteItem = id => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteCartItem(id, cartItems, dispatch));
    }
  };

  return {
    cartItems,
    orderButtonText,
    isCheckedAll,
    checkedItems,
    formattedTotalPrice,
    updateIncreaseQuantity,
    updateDecreaseQuantity,
    updateCartURL,
    updateCarts,
    routeToOrderPayment,
    toggleOneCheckBox,
    toggleAllCheckBox,
    deleteItem,
    getTotalQuantity,
    getTotalPrice,
  };
};

export default useCarts;
