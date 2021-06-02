import styled from 'styled-components';

export const ProductListPage = styled.div`
  min-height: ${({ theme }) => theme.PAGE_HEIGHT};
  margin-top: 60px;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
`;

export const ProductItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  justify-content: center;
  column-gap: 46px;
  row-gap: 28px;
`;

export const PaginationWrapper = styled.div`
  margin-top: 120px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
`;
