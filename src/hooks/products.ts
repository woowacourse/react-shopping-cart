import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getProducts } from '../modules/products/actions';

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products]);

  return { products, loading, error };
};

export default useProducts;
