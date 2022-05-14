import { useDispatch, useSelector } from 'react-redux';
import { getProductsAsync } from 'reducers/products/products.thunks';
import { useEffect } from 'react';

const useProducts = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector((state) => state.products);

  useEffect(() => {
    if (data.length > 0) return;
    dispatch(getProductsAsync);
  }, [data]);

  return { isLoading, isError, data };
};

export default useProducts;
