import styled, { keyframes, css } from 'styled-components';

const moveUp = keyframes`
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(-10px);
  }
`;

const moveDown = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(100px);
  }
`;

const moveUpAnimation = (duration: number) => css`
  animation: ${moveUp} ${duration / 1000}s forwards;
`;

const moveDownAnimation = (duration: number) => css`
  animation: ${moveDown} ${duration / 1000}s forwards;
`;

export const Snackbar = styled.div<{ isShown: boolean; duration: number }>`
  display: inline-block;
  position: absolute;
  text-align: center;
  left: 30%;
  right: 30%;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.WHITE};
  bottom: 0;
  padding: 25px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.BLACK_500};
  ${({ isShown, duration }) => (isShown ? moveUpAnimation(duration) : moveDownAnimation(duration))};
`;
