import styled from 'styled-components';

const CartItemWrapper = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const ItemNameWrapper = styled.div`
  width: 200px;
`;

const ItemCountBox = styled.div`
  display: flex;
  border: ${({theme}) => `solid 1px ${theme.COLOR.GRAY_500}`};
  width: 73px;
  height: 58px;
  align-items: center;
  justify-content: center;
`;

export {CartItemWrapper, ItemNameWrapper, ItemCountBox};
