import { ImageSkeletonStyle, TextSkeletonStyle } from '@Styles/common/skeletonProductItem';
import styled from 'styled-components';

type ContainerProps = {
  width?: string;
};

export const Container = styled.div<ContainerProps>`
  min-width: ${(props) => props.width ?? '100%'};
  display: flex;
  flex-direction: column;
`;

type LoadingProps = {
  isLoading?: boolean;
};

export const ProductItemImageFrame = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

export const ProductItemImage = styled.img<LoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  margin-bottom: 18px;

  ${ImageSkeletonStyle};
`;

export const ProductItemContents = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
  column-gap: 20px;
  color: #4f4f4f;
`;

export const ProductItemLayout = styled.div`
  min-width: 100%;
  margin-left: 10px;
`;

export const ProductItemName = styled.div<LoadingProps>`
  line-height: 20px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const ProductItemPrice = styled.div<LoadingProps>`
  font-size: 20px;
  margin-top: 5px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;
