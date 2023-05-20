import styled from 'styled-components';

const ProductListContainer = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: ${({ theme }) => theme.spacer.spacing4};
  column-gap: 20px;
`;

export { ProductListContainer };
