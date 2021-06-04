import styled from 'styled-components';

export const ProductPage = styled.main`
  max-width: 57rem;
  margin: 7rem auto;
  user-select: none;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem 3rem;
  justify-items: center;
  margin: 0 auto;

  & > li {
    width: 12rem;
  }

  @media (max-width: 960px) {
    max-width: 42rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    max-width: 27rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    max-width: 15rem;
    grid-template-columns: repeat(1, 1fr);
  }
`;
