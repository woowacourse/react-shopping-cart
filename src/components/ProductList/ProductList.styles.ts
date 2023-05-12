import styled from 'styled-components';

const ProductListContainer = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  align-items: start;
  row-gap: ${({ theme }) => theme.spacer.spacing4};
  column-gap: ${({ theme }) => theme.spacer.spacing3};
`;

export { ProductListContainer };
