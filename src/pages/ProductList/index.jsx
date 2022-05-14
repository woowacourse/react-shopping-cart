import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductListStyled, LoadingWrapperStyled } from './style';

import Product from 'templates/Product';
import { requestProducts } from 'modules/product';
import BlackText from 'components/BlackText';
import { getProductList } from 'apis/product';

function ProductList() {
  const products = useSelector((state) => state.product.products);
  const requestProductLoading = useSelector((state) => state.product.requestProductsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProducts());
    dispatch(getProductList());
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

export default ProductList;
