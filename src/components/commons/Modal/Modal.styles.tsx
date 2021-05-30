import styled, { keyframes, css } from 'styled-components';
import { Props } from './Modal';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  animation: ${fadeIn} 1s forwards;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.WHITE};
`;
