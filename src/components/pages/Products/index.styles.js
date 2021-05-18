import styled from 'styled-components';

export const Page = styled.main`
  max-width: 960px;
  margin: 7rem auto;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem 0;

  & > li {
    margin: 0 auto;
  }
`;
