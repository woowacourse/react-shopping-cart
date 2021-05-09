import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';

const Products = ({ products }) => {
  return (
    <ProductPage>
      <ProductList>
        {products.map(({ id, ...product }) => (
          <li key={id}>
            <ProductItem {...product} />
          </li>
        ))}
      </ProductList>
    </ProductPage>
  );
};

export default Products;
