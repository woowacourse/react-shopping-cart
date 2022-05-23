import styled, { css, keyframes } from 'styled-components';

import { color } from 'constants/constants';

export const StyledProductItem = styled.div`
  width: 282px;
  position: relative;
`;

export const StyledProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 0 15px;
`;

export const StyledProductText = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;

  ${({ name }) =>
    name &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}

  ${({ price }) =>
    price &&
    css`
      font-size: 20px;
      line-height: 27px;
    `}
`;

export const StyledQuantityContainer = styled.div`
  background-color: ${color.mint};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const refresh = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

export const SkeletonProductItem = styled.div`
  width: 282px;
`;

export const SkeletonProductImage = styled.div`
  width: 282px;
  height: 282px;
  background-color: gray;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  animation: ${refresh} 2s infinite ease-out;
`;

export const SkeletonProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
`;

export const SkeletonProductText = styled.div`
  background-color: gray;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  margin-top: 13px;
  animation: ${refresh} 2s infinite ease-out;
  ${({ name }) =>
    name &&
    css`
      width: 100%;
      height: 22px;
    `}
  ${({ price }) =>
    price &&
    css`
      width: 80%;
      height: 27px;
    `}
`;
