import {useDispatch, useSelector} from 'react-redux';
import {getProductList} from 'store/productList';

const useProductList = () => {
  const dispatch = useDispatch();

  const {pending, error, data} = useSelector((state) => state.productListReducer);

  const getProducts = () => {
    dispatch(getProductList());
  };

  return {pending, error, data, getProducts};
};

export default useProductList;
