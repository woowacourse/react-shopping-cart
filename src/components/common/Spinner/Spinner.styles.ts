import { styled } from 'styled-components';

import { SpinnerProps } from './Spinner';

const Spinner = styled.div<SpinnerProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ width }) => width}px solid ${({ theme }) => theme.color.gray2};
  border-bottom-color: ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation ${({ timing }) => timing}s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { Spinner };
