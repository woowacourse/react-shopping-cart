import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { requestProductsAdd, requestProductsAddFail } from 'modules/product';
import { requestCartAdd, requestCartAddFail } from 'modules/cart';

async function useGetProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/products');
        const products = await res.data;

        dispatch(requestProductsAdd(products));
      } catch (error) {
        dispatch(requestProductsAddFail(error));
      }
    };
    fetchData();
  }, []);
}

async function useGetSelectedProduct(id) {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(`/products/${id}`);
    const product = await res.data;

    dispatch(requestCartAdd(product));
  } catch (error) {
    dispatch(requestCartAddFail(error));
  }
}

export { useGetProductList, useGetSelectedProduct };
