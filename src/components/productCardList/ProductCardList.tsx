import styled from 'styled-components';
import { Product } from '../../types/Product';

import { ProductCard } from '../productCard/ProductCard';

interface ProductCardListProps {
  products: Product[];
}

export const ProductCardList = ({ products }: ProductCardListProps) => {
  return (
    <Style.Container>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 300px);
    justify-items: center;
    column-gap: 47px;
    row-gap: 86px;
  `,
};
