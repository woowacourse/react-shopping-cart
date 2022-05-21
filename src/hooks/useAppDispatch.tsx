import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductListAction } from 'store/productList/reducer';
import { CartProductListAction } from 'store/cartProductList/reducer';
import { AppDispatch } from 'types';

const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch<ProductListAction | CartProductListAction>>();

  return dispatch;
};

export default useAppDispatch;
