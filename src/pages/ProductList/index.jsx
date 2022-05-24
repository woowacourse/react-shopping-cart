import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProductListStyled from './style';
import Product from 'templates/Product';
import StateMessage from 'containers/StateMessage';

import MESSAGE from 'constants';
import { useGetProductList } from 'hooks/useDataFetch';

function ProductList() {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const isError = useSelector((state) => state.product.isError);

  const test = useGetProductList();

  useEffect(() => {
    test();
  }, []);

  if (isLoading) {
    console.log(isLoading);
    return <StateMessage message={MESSAGE.LOADING} />;
  }

  if (isError) {
    return <StateMessage message={MESSAGE.ERROR} />;
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
