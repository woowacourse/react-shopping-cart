import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE } from '../constants';
import {
  deleteProduct,
  deleteCheckedProduct,
  setChecked,
  setCheckedAll,
} from '../redux';

const useCart = () => {
  const { products } = useSelector(({ cart }) => cart);
  const checkedProducts = products.filter(({ isChecked }) => isChecked);
  const isCheckedAll =
    products.length > 0 ? checkedProducts.length === products.length : false;
  const dispatch = useDispatch();

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

  return {
    products,
    checkedProducts,
    isCheckedAll,
    deleteFromCart,
    deleteCheckedFromCart,
    toggleChecked,
    toggleCheckedAll,
  };
};

export default useCart;
