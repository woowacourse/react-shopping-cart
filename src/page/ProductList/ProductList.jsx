import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout, Spinner } from 'component/common';
import { NavBar, Product } from 'component';

import { FRUITS } from 'constant';

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

const SpinnerBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

function ProductList() {
  const products = useSelector(products => products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsAsyncThunk());
  }, []);

  return (
    <>
      <NavBar />
      <Body>
        {products.length ? (
          <GridLayout>
            {products.map(product => (
              <Product key={product.id} {...product} />
            ))}
          </GridLayout>
        ) : (
          <SpinnerBox>
            {FRUITS.map(fruit => (
              <Spinner key={fruit}>
                <span style={{ fontSize: '50px' }}>{fruit}</span>
              </Spinner>
            ))}
          </SpinnerBox>
        )}
      </Body>
    </>
  );
}

export default ProductList;
