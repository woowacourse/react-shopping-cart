import styled from 'styled-components';

import { ProductCard } from '../productCard/ProductCard';
import { useRecoilValue } from 'recoil';
import { productItemsState } from '../../../recoil/atoms/productAtom';

export const ProductCardGrid = () => {
  const products = useRecoilValue(productItemsState);

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
