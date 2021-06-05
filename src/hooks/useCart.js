import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { MESSAGE, ROUTE } from '../constants';
import {
  deleteProduct,
  deleteCheckedProduct,
  setChecked,
  setCheckedAll,
  increaseProduct,
  decreaseProduct,
  clearChecked,
  addOrderedProduct,
} from '../redux';

const useCart = () => {
  const { products } = useSelector(({ cart }) => cart);
  const checkedProducts = products.filter(({ isChecked }) => isChecked);
  const isCheckedAll =
    products.length > 0 ? checkedProducts.length === products.length : false;
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteFromCart = product_id => {
    if (!window.confirm(MESSAGE.CART.DELETE_FROM_CART_CONFIRM)) return;
    dispatch(deleteProduct({ product_id }));
  };

  const deleteCheckedFromCart = () => {
    if (products.length === 0) return alert('삭제할 상품이 없습니다.');
    if (!window.confirm(MESSAGE.CART.DELETE_FROM_CART_CONFIRM)) return;
    dispatch(deleteCheckedProduct());
  };

  const toggleChecked = (product_id, isChecked) => {
    dispatch(setChecked({ product_id, isChecked: !isChecked }));
  };

  const toggleCheckedAll = () => {
    dispatch(setCheckedAll({ isChecked: !isCheckedAll }));
  };

  const increaseQuantity = product_id => {
    dispatch(increaseProduct({ product_id }));
  };

  const decreaseQuantity = product_id => {
    dispatch(decreaseProduct({ product_id }));
  };

  const order = () => {
    if (checkedProducts.length === 0) return alert('주문할 상품이 없습니다.');
    history.push(ROUTE.ORDER_PAYMENT);
  };

  const pay = products => {
    dispatch(addOrderedProduct({ products }));
    dispatch(clearChecked());
    history.push(ROUTE.COMPLETED_ORDER);
  };

  return {
    products,
    checkedProducts,
    isCheckedAll,
    deleteFromCart,
    deleteCheckedFromCart,
    toggleChecked,
    toggleCheckedAll,
    increaseQuantity,
    decreaseQuantity,
    order,
    pay,
  };
};

export default useCart;
