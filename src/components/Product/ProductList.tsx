import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductItem from './ProductItem';

import type { Product } from '../../types/product';

const URL = `${process.env.PUBLIC_URL}/data/products.json`;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <ProductListContainer>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;
`;

export default ProductList;
