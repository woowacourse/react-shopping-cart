import GridLayout from 'component/common/GridLayout/GridLayout';
import NavBar from 'component/NavBar/NavBar';
import styled from 'styled-components';
import Product from 'component/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { productsAsyncThunk } from 'store/action/productsActions';

const Body = styled.div`
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
    <>
      <NavBar />
      <Body>
        <GridLayout>
          {products && products.map(product => <Product key={product.id} {...product} />)}
        </GridLayout>
      </Body>
    </>
  );
}

export default ProductList;
