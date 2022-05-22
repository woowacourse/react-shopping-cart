import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductListStyled from './style';
import Product from 'templates/Product';
import { requestProductsAdd } from 'modules/product';
import StateMessage from 'containers/StateMessage';

import useDataFetch from 'hooks/useDataFetch';
import MESSAGE from 'constants';

function ProductList() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [{ data, isLoading, isError }] = useDataFetch(process.env.REACT_APP_DATA_SERVER, products);

  useEffect(() => {
    dispatch(requestProductsAdd(data));
  });

  if (isLoading) {
    return <StateMessage message={MESSAGE.LOADING} />;
  }

  if (isError) {
    return <StateMessage message={MESSAGE.ERROR} />;
  }

  return (
    <ProductListStyled>
      {data.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ProductListStyled>
  );
}

export default ProductList;
