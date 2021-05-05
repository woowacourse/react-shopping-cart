import React from 'react';
import ProductItem from '../../components/units/ProductItem/ProductItem';
import Styled from './ProductsPage.styles';

const ProductsPage = () => {
  return (
    <Styled.Root>
      <Styled.ProductList>
        {Array.from({ length: 7 }, (_, index) => (
          <li key={index}>
            <ProductItem title="밀크티존맛탱" price={1000000} />
          </li>
        ))}
      </Styled.ProductList>
    </Styled.Root>
  );
};

export default ProductsPage;
