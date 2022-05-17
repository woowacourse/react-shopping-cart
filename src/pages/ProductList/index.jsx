import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductListStyled, MessageWrapperStyled } from './style';
import Product from 'templates/Product';
import { requestProductsAdd } from 'modules/product';
import BlackText from 'components/BlackText';

import useDataFetch from 'hooks/useDataFetch';

function ProductList() {
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const [{ data, isLoading, isError }] = useDataFetch(process.env.REACT_APP_DATA_SERVER, products);
  dispatch(requestProductsAdd(data));

  if (isLoading) {
    return (
      <MessageWrapperStyled>
        <BlackText fontSize="30px" fontWeight="800">
          로딩중...
        </BlackText>
      </MessageWrapperStyled>
    );
  }

  if (isError) {
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
      {data.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ProductListStyled>
  );
}

export default ProductList;
