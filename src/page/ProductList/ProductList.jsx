import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout, Spinner } from 'component/common';
import { PageLayout, Product } from 'component';

import { FRUITS } from 'constant';

const FruitBox = styled.div`
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
    <PageLayout>
      {products.length ? (
        <GridLayout>
          {products.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </GridLayout>
      ) : (
        <FruitBox>
          {FRUITS.map(fruit => (
            <Spinner key={fruit}>
              <span style={{ fontSize: '50px' }}>{fruit}</span>
            </Spinner>
          ))}
        </FruitBox>
      )}
    </PageLayout>
  );
}

export default ProductList;
