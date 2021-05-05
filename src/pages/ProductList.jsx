import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductListItem from '../components/productListItem/ProductListItem';

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
  padding: 0 60px;
  margin-top: 40px;
`;

const ProductList = () => {
  // TODO: ~State 뺄지
  const [productListState, setProductListState] = useState(null);

  useEffect(() => {
    const getProductList = async () => {
      const response = await fetch('http://localhost:4000/products');
      const result = await response.json();

      setProductListState(result);
    };

    getProductList();
  }, []);

  return (
    <StyledUl>
      {productListState?.map((product) => (
        <li key={product.id}>
          <ProductListItem src={product.src} name={product.name} price={product.price} alt={product.alt} />
        </li>
      ))}
    </StyledUl>
  );
};

export default ProductList;
