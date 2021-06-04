import { useDispatch, useSelector } from 'react-redux';
import { setChecked, setCheckedAll } from '../redux';

const useCart = () => {
  const products = useSelector(({ cart }) => cart);
  const checkedProducts = products.filter(({ isChecked }) => isChecked);
  const isCheckedAll =
    products.length > 0 ? checkedProducts.length === products.length : false;
  const dispatch = useDispatch();

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
    toggleChecked,
    toggleCheckedAll,
  };
};

export default useCart;
