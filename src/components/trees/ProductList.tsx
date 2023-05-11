import type { ProductType } from '../../types';
import styled from 'styled-components';
import Product from '../leafs/Product';

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
  grid-template-columns: repeat(4, 282px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;
`;

const S = {
  Wrapper,
};
