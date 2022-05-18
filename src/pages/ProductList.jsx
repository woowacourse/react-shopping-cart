import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';
import EmptyProductItem from 'components/EmptyProductItem';

import { getProductList } from 'actions/products';

import * as Styled from './styles';

const ProductList = () => {
  const { items: productList, errorMessage } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <Layout>
      <Styled.ProductListContainer>
        {errorMessage && <h1>{errorMessage}</h1>}
        {productList ? (
          productList.map(({ id, name, price, thumbnail }) => (
            <ProductItem key={id} id={id} thumbnail={thumbnail} name={name} price={price} />
          ))
        ) : (
          <EmptyProductItem />
        )}
      </Styled.ProductListContainer>
    </Layout>
  );
};

export default ProductList;
