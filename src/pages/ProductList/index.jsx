import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'templates/Header';
import Product from 'templates/Product';

import ProductListStyled from './style';

import { requestProducts, requestProductsDone, requestProductsError } from 'modules/product';

function ProductList() {
  const products = useSelector((state) => state.product.products);
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

  return (
    <>
      <Header />
      <ProductListStyled>
        {products && products.map((product) => <Product key={product.id} {...product} />)}
      </ProductListStyled>
    </>
  );
}

export default ProductList;
