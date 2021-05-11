import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getProducts } from '../modules/product';

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products]);

  return { products, loading, error };
};

export default useProducts;
