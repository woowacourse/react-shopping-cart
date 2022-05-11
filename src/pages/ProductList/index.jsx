import React from 'react';

import Header from 'templates/Header';
import Product from 'templates/Product';

import ProductListStyled from './style';

function ProductList() {
  return (
    <>
      <Header />
      <ProductListStyled>
        {Array(10)
          .fill()
          .map((v) => (
            <Product key={v} />
          ))}
      </ProductListStyled>
    </>
  );
}

export default ProductList;
