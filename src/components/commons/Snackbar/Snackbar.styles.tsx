import styled, { keyframes, css } from 'styled-components';

const moveUp = keyframes`
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(-10px);
  }
`;

const moveUpAnimation = css`
  animation: ${moveUp} 0.7s forwards;
`;

export const Snackbar = styled.div`
  display: inline-block;
  position: fixed;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.WHITE};
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 270px;
  padding: 25px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.BLACK_500};
  ${moveUpAnimation}
`;
