import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductListItem from '../components/productListItem/ProductListItem';
import { fetchProductList } from '../redux/product';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
`;

const ProductList = () => {
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <Container>
      {productList &&
        productList.map((product) => (
          <li key={product.product_id}>
            <ProductListItem product={product} />
          </li>
        ))}
    </Container>
  );
};

export default ProductList;
