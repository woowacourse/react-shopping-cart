import styled from 'styled-components';

export const ProductPage = styled.main`
  max-width: 1080px; //TODO: 상수화
  margin: 4rem auto;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem 0;

  & > li {
    width: 250px;
  }
`;
