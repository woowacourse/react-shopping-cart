import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { INTERVAL_TIME } from '../constants';
import { RootState } from '../states';
import { getProducts } from '../states/actions/products';

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, loadingError } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products]);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(getProducts());
    }, INTERVAL_TIME.UPDATE_NEWEST_PRODUCTS);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return { products, loading, loadingError };
};

export default useProducts;
