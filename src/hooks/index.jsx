import { useDispatch, useSelector } from 'react-redux';

import { getProductList } from 'apis/product';
import { getProductLoading } from 'modules/product';

export const useProducts = () => {
  const products = useSelector((state) => state.product.products);
  const isProductLoading = useSelector((state) => state.product.getProductLoading);
  const dispatch = useDispatch();

  const requestProduct = () => {
    dispatch(getProductLoading());
    dispatch(getProductList());
  };

  return { isProductLoading, products, requestProduct };
};
