import styled from 'styled-components';

const CartItemWrapper = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const ItemNameWrapper = styled.div`
  width: 300px;
`;

const EditQuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  width: 115px;
`;

export {CartItemWrapper, EditQuantityWrapper, ItemNameWrapper};
