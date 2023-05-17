import styled from 'styled-components';

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 60px;
  row-gap: 80px;
  margin-bottom: 100px;
`;

export const ProductListErrorContainer = styled.div`
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
