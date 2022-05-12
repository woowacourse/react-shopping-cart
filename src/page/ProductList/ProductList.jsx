import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAsyncThunk } from 'store/action/productsActions';

import GridLayout from 'component/common/GridLayout/GridLayout';
import Spinner from 'component/common/Spinner/Spinner';

import NavBar from 'component/NavBar/NavBar';
import Product from 'component/Product/Product';

import { fruits } from 'constants';

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

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
          <FruitBox>
            {fruits.map(fruit => (
              <Spinner key={fruit}>
                <span style={{ fontSize: '50px' }}>{fruit}</span>
              </Spinner>
            ))}
          </FruitBox>
        )}
      </Body>
    </>
  );
}

export default ProductList;
