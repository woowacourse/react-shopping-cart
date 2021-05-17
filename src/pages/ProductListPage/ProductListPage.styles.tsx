import styled from 'styled-components';

export const ProductListPage = styled.div`
  min-height: ${({ theme }) => theme.PAGE_HEIGHT};
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(4, 282px);
  justify-content: center;
  column-gap: 46px;
  row-gap: 28px;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
`;
