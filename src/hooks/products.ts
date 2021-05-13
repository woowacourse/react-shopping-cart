import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { INTERVAL_TIME } from '../constants';
import { RootState } from '../modules';
import { getProducts } from '../modules/product';

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(getProducts());
    }, INTERVAL_TIME.UPDATE_NEWEST_PRODUCTS);

    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line
  }, []);

  return { products, loading, error };
};

export default useProducts;
