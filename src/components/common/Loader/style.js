import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  opacity: 0.8;
  ${({ animationType }) =>
    animationType === 'spin' &&
    css`
      animation: ${spin} 0.5s;
      animation-iteration-count: infinite;
    `}
`;
