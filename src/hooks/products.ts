import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getProducts } from '../modules/product';

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  const fetchProducts = useCallback(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return { products, loading, error, fetchProducts };
};

export default useProducts;
