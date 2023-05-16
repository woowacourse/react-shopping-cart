import styled from 'styled-components';
import { ItemWrapper, ProductWrapper } from '../ProductItem.styles';

export const Skeleton = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-gradient 5s infinite ease-out;
  border-radius: 8px;

  @keyframes skeleton-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const LoadingItemWrapper = styled(ItemWrapper)``;

export const LoadingItemImage = styled(Skeleton)`
  width: 224px;
  height: 224px;
  margin-bottom: 12px;
`;

export const LoadingProductWrapper = styled(ProductWrapper)``;

export const LoadingProductName = styled(Skeleton)`
  width: 176px;
  height: 24px;
  margin-bottom: 12px;
`;

export const LoadingProductPrice = styled(Skeleton)`
  width: 72px;
  height: 24px;
`;
