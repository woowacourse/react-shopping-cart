import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { ProductListAction } from 'store/productList/reducer';
import { CartProductListAction } from 'store/cartProductList/reducer';
import { AppDispatch } from 'types';
import useAppDispatch from './useAppDispatch';

type Key = 'product' | 'cart';

const useGlobalState = (key: Key) => {
  const dispatch = useAppDispatch();

  const state = useSelector((state: RootState) => state[key]);

  return { dispatch, state };
};

export default useGlobalState;
