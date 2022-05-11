import styled from '@emotion/styled';

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 1rem;
  justify-items: center;
  margin: 3rem 0;
  padding: 0 8rem;
`;

export { ProductListWrapper };
