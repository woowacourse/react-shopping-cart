import { useEffect } from 'react';
import { getProducts, ProductState } from '../slices/productSlice';
import { useAppDispatch, useAppSelector } from './useStore';

const useProduct = (): ProductState => {
  const products = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { data, status, error } = products;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return { data, status, error };
};

export default useProduct;
