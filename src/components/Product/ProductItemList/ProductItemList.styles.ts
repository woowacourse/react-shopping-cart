import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  column-gap: 24px;
  margin-top: 60px;

  @media (min-width: 720px) and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 480px) and (max-width: 719px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 320px) and (max-width: 479px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
