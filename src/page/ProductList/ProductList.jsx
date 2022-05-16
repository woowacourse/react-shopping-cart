import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts, productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout } from 'component/common';
import LoadingSpinner from 'component/LoadingSpinner/LoadingSpinner';
import ProductContainer from 'container/ProductContainer';

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

function ProductList() {
  const products = useSelector(products => products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length) {
      dispatch(clearProducts());
    }
    dispatch(productsAsyncThunk());
  }, []);

  return (
    <Content>
      {products.length ? (
        <GridLayout>
          {products.map(product => (
            <ProductContainer key={product.id} {...product} />
          ))}
        </GridLayout>
      ) : (
        <LoadingSpinner />
      )}
    </Content>
  );
}

export default ProductList;
