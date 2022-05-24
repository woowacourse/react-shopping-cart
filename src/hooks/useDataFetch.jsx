import axios from 'axios';
import { useDispatch } from 'react-redux';

import { requestProductsAdd, requestProductsAddFail, requestIsLoadingTrue } from 'modules/product';

import { requestCartAdd, requestCartAddFail } from 'modules/cart';

function useGetProductList() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(requestIsLoadingTrue());
      const res = await axios.get('/products');
      const products = await res.data;

      dispatch(requestProductsAdd(products));
    } catch (error) {
      dispatch(requestProductsAddFail(error));
    }
  };

  return fetchData;
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
