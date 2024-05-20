import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// 출처: https://cssloaders.github.io/
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.span`
  display: inline-block;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border-top: 4px solid #fff;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  position: relative;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid ${({ theme }) => theme.colors.semiBlack};
    border-left: 4px solid transparent;
  }
`;

export default LoadingSpinner;
