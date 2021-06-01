import styled, { css, keyframes } from 'styled-components';
import { Properties } from 'csstype';

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(50%);
  }
  
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const Container = styled.div<Properties>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: ${({ bottom }) => bottom};
  left: 50%;
  transform: translateX(-50%);

  min-width: 20rem;
  height: 2.3rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  font-size: 0.8rem;
  padding: 1rem 2rem;
  color: #e7e7e7;

  animation: ${({ animationDuration }) =>
    css`
      ${appearFromBottom} ${animationDuration} ease
    `};
`;

export { Container };
