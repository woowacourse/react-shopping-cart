import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { RootState } from '../modules';
import { getProducts } from '../modules/products/actions';

const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products]);

  return { products, loading, error };
};

export default useProducts;
