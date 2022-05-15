import styled from 'styled-components';

const ProductListPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 140px;
`;

const ProductListWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 10%;
`;

export {ProductListPageWrapper, ProductListWrapper};
