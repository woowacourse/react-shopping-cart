import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout } from 'component/common';
import { Product } from 'component';

import LoadingSpinner from 'component/LoadingSpinner/LoadingSpinner';

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

function ProductList() {
  const products = useSelector(products => products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsAsyncThunk());
  }, []);

  return (
    <Content>
      {!products.length && <LoadingSpinner />}
      {products.length && (
        <GridLayout>
          {products.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </GridLayout>
      )}
    </Content>
  );
}

export default ProductList;
