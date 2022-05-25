import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
 from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(-50px);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 0;
  }
`;

export default styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.green};
  color: white;
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;
  animation-fill-mode: forwards;
`;

// animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;

// ${({ show }) =>
//   show &&
//   css`
//     visibility: visible;
//     animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;
//   `}
