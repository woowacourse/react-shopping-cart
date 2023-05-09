import styled from 'styled-components';

export const Container = styled.div`
  width: 282px;
  display: flex;
  flex-direction: column;
`;

export const ShoppingItemImage = styled.img`
  height: 282px;
  margin-bottom: 18px;
`;

export const ShoppingItemContents = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  align-items: flex-start;
  column-gap: 20px;
  color: #4f4f4f;
`;

export const ShoppingItemLayout = styled.div`
  margin-left: 10px;
`;

export const ShoppingItemName = styled.div`
  line-height: 20px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShoppingItemPrice = styled.div`
  font-size: 20px;
  margin-top: 5px;
`;
