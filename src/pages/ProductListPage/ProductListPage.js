import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridColumnList from '../../components/utils/GridColumnList';
import LoadingPage from '../../pages/LoadingPage';
import ProductItem from './ProductItem';

import { getProductsRequest } from '../../modules/productSlice';
import { getCartItemsRequest } from '../../modules/cartSlice';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, errorMessage, loading } = useSelector((state) => state.productSlice);

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
      {loading && <LoadingPage>상품목록을 불러오는 중입니다</LoadingPage>}
      <GridColumnList gridColumnGap="48px" gridRowGap="28px" gridColumnRepeatCount={4} gridColumnWidth="282px">
        {products.map((product) => (
          <ProductItem product={product} key={product.product_id} />
        ))}
      </GridColumnList>
    </>
  );
};

export default ProductListPage;
