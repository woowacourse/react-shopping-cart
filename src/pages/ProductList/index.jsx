import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductListStyled, MessageWrapperStyled } from './style';
import Product from 'templates/Product';
import { requestProducts, requestProductsDone, requestProductsError } from 'modules/product';
import BlackText from 'components/BlackText';

function ProductList() {
  const products = useSelector((state) => state.product.products);
  const requestProductLoading = useSelector((state) => state.product.requestProductsLoading);
  const requestProductError = useSelector((state) => state.product.requestProductsError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProducts());
    dispatch(async (storeDispatch) => {
      try {
        const body = await fetch(process.env.REACT_APP_DATA_SERVER);
        const products = await body.json();

        storeDispatch(requestProductsDone(products));
      } catch (error) {
        storeDispatch(requestProductsError());
      }
    });
  }, []);

  if (requestProductLoading) {
    return (
      <MessageWrapperStyled>
        <BlackText fontSize="30px" fontWeight="800">
          로딩중...
        </BlackText>
      </MessageWrapperStyled>
    );
  }

  if (requestProductError) {
    return (
      <MessageWrapperStyled>
        <BlackText fontSize="30px" fontWeight="800">
          에러! 개발자에게 문의하세요.
        </BlackText>
      </MessageWrapperStyled>
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

export default ProductList;
