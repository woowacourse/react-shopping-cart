import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

type LoadingProps = {
  isLoading?: boolean;
};

export const ShoppingItemImage = styled.img`
  height: 250px;
  margin-bottom: 18px;
  background-color: #e0e0e0;
`;

export const ShoppingItemContents = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
  column-gap: 20px;
  color: #4f4f4f;
`;

export const ShoppingItemLayout = styled.div`
  min-width: 100%;
  margin-left: 10px;
`;

export const ShoppingItemName = styled.div<LoadingProps>`
  line-height: 20px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.isLoading ? '#e0e0e0' : 'rgba(0,0,0,0)')};
`;

export const ShoppingItemPrice = styled.div<LoadingProps>`
  font-size: 20px;
  margin-top: 5px;
  background-color: ${(props) => (props.isLoading ? '#e0e0e0' : 'rgba(0,0,0,0)')};
`;
