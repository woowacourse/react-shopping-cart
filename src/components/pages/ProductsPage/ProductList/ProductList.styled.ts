import styled from 'styled-components';

export const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 80px 40px;

  height: 100%;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
