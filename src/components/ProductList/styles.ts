import styled from 'styled-components';

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 1.5rem 3rem;
`;
