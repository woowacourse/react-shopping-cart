import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;
`;

type ProductListProps = PropsWithChildren;

const ProductList = (props: ProductListProps) => {
  const { children } = props;

  return <StyledProductList>{children}</StyledProductList>;
};

export default ProductList;
