import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductItem from './ProductItem';

import { fetchProducts } from '../../apis/products';
import type { Product } from '../../types/product';
import useCartProductUpdate from '../../hooks/useCartProductUpdate';
import AbnormalMessage from '../Common/AbnormalMessage';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  useCartProductUpdate();

  if (products.length === 0) {
    return <AbnormalMessage abnormalState='empty' />;
  }

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
