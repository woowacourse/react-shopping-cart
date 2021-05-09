import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.PAGE_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductListPage = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(4, 282px);
  justify-content: center;
  column-gap: 46px;
  row-gap: 28px;
`;
