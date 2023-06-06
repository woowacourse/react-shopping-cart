import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 30px;
`;

export const TotalProductLength = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;

  padding: 0 16px;

  font-size: 14px;

  background-color: var(--grey-200);
`;

export const ProductList = styled.ul`
  margin-top: 20px;
  margin-bottom: 60px;

  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  @media screen and (min-width: 1080px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 1079px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
  }
`;
