import styled from 'styled-components';

export const StyledProductListPage = styled.main`
  width: 1269px;
  background-color: white;
  margin-top: 140px;
  padding: 40px;
  overflow: scroll;
  height: 100%;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 47px;
`;
