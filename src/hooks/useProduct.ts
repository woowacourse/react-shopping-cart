import { useCallback, useEffect, useState } from 'react';
import * as T from 'types';
import API from 'constants/api';
import useAxios from './useAxios';

const useProduct = (initialState: T.Product, id: T.ProductId) => {
  const [product, setProduct] = useState(initialState);
  const [{ data, errorMessage }, fetch] = useAxios<T.Product>(`${API.PRODUCTS}/${id}`);

  const fetchProduct = useCallback(async () => {
    if (!data) {
      await fetch();
    }

    if (data) {
      setProduct(data);
    }
  }, [data, fetch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return [{ product, errorMessage }];
};

export default useProduct;
