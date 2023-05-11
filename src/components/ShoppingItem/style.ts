import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

type LoadingProps = {
  isLoading?: boolean;
};

const SkeletonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ImageSkeletonStyle = css`
  background: linear-gradient(-90deg, #dee2e6, #f0f0f0, #dee2e6, #f0f0f0);
  background-size: 400%;
  animation: ${SkeletonAnimation} 5s infinite ease-in-out;
`;

export const ShoppingItemImage = styled.img<LoadingProps>`
  height: 250px;
  margin-bottom: 18px;

  ${ImageSkeletonStyle};
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
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const ShoppingItemPrice = styled.div<LoadingProps>`
  font-size: 20px;
  margin-top: 5px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

const TextSkeletonStyle = css`
  color: transparent;
  background: linear-gradient(-90deg, #dee2e6, #f0f0f0, #dee2e6, #f0f0f0);
  background-size: 400%;
  animation: ${SkeletonAnimation} 5s infinite ease-in-out;
`;
