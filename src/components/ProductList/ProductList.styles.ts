import styled from 'styled-components';

const ProductListContainer = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 24px;
  column-gap: 16px;
  align-items: start;
`;

export { ProductListContainer };
