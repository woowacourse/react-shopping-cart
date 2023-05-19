import styled from 'styled-components';

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 60px;
  row-gap: 30px;
  margin-bottom: 100px;

  @media (min-width: 575px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 40px;
  }

  @media (min-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 50px;
  }

  @media (min-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 75px;
  }

  @media (min-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 80px;
  }
`;
