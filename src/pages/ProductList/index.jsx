import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductListStyled, LoadingWrapperStyled } from './style';

import Product from 'templates/Product';
import { requestProducts, requestProductsDone, requestProductsError } from 'modules/product';
import BlackText from 'components/BlackText';

function ProductListPage() {
  const products = useSelector((state) => state.product.products);
  const requestProductLoading = useSelector((state) => state.product.requestProductsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProducts());
    dispatch(async (storeDispatch) => {
      try {
        const body = await fetch('http://localhost:4000/products');
        const products = await body.json();

        storeDispatch(requestProductsDone(products));
      } catch (error) {
        storeDispatch(requestProductsError());
      }
    });
  }, []);

  if (requestProductLoading) {
    return (
      <LoadingWrapperStyled>
        <BlackText fontSize="30px" fontWeight="800">
          로딩중...
        </BlackText>
      </LoadingWrapperStyled>
    );
  }

  return (
    <ProductListStyled>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ProductListStyled>
  );
}

export default ProductListPage;
