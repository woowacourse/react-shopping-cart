import React, { useEffect } from 'react';
import { useProducts } from 'hooks';

import { ProductListStyled, LoadingWrapperStyled } from './style';

import Product from 'templates/Product';
import BlackText from 'components/BlackText';

function ProductList() {
  const { isProductLoading, products, requestProduct } = useProducts();

  useEffect(() => {
    requestProduct();
  }, []);

  if (isProductLoading) {
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
