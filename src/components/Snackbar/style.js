import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
 from {
    transform: translate(-50%, 0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50px);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translate(-50%, -50px);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 0);
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
  font-size: 1.8rem;
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;
  animation-fill-mode: forwards;
`;
