import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductListState } from 'store/productList/reducer';
import useGlobalState from 'hooks/useGlobalState';

const useProductList = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useGlobalState('product');

  return {
    dispatch,
    navigate,
    data: state as ProductListState,
  };
};

export default useProductList;
