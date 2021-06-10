import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridColumnList from '../../components/utils/GridColumnList';
import LoadingPage from '../../pages/LoadingPage';
import ProductItem from './ProductItem';

import { getProductsRequest } from '../../modules/productSlice';
import { getCartItemsRequest } from '../../modules/cartSlice';

import { STATUS, LOADING_MESSAGE } from '../../constant';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { status, products, errorMessage } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProductsRequest());
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {status === STATUS.LOADING && <LoadingPage>{LOADING_MESSAGE.PRODUCT_LIST}</LoadingPage>}
      <GridColumnList gridColumnGap="48px" gridRowGap="28px" gridColumnRepeatCount={4} gridColumnWidth="282px">
        {products.map((product) => (
          <ProductItem product={product} key={product.product_id} />
        ))}
      </GridColumnList>
    </>
  );
};

export default ProductListPage;
