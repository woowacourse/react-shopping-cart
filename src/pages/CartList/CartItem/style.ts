import { ImageSkeletonStyle, TextSkeletonStyle } from '@Styles/common/skeleton';
import styled from 'styled-components';

type ContainerProps = {
  width: string;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  column-gap: 20px;
  width: ${(props) => props.width};
  background-color: #ffffff;
  padding: 20px 0px 30px 0px;
`;

type LoadingProps = {
  isLoading?: boolean;
};

export const ShoppingItemImage = styled.img<LoadingProps>`
  width: 150px;
  height: 150px;
  ${ImageSkeletonStyle};
`;

export const ShoppingItemName = styled.div<LoadingProps>`
  color: #333333;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const RightContents = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: flex-end;
`;

export const DeleteButton = styled.img`
  align-self: flex-start;
  cursor: pointer;
`;

export const ShoppingItemPrice = styled.div<LoadingProps>`
  align-self: flex-end;
  color: #333333;
  font-weight: 400;
  line-height: 24px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;
