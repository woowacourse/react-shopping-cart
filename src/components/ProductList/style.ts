import styled from 'styled-components';

export const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 60px;
  row-gap: 80px;
  margin-bottom: 100px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 768px) {
    // 모바일
    grid-template-columns: repeat(1, 1fr);
  }
`;
