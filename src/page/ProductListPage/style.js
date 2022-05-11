import styled from 'styled-components';

const ItemListWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  height: calc(100vh - 140px);
  margin: 140px 10%;
`;

export {ItemListWrapper};
