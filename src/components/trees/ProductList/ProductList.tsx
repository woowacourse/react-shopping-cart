import type { ProductType } from '../../../types';
import styled from 'styled-components';

import Product from '../../branches/Product/Product';

interface ProductListProps {
  products: ProductType[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <S.Wrapper>
      {products.map((product) => (
        <Product key={product.id} {...product}></Product>
      ))}
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  @media screen and (max-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 38px;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 28px;
  }
`;

const S = {
  Wrapper,
};
