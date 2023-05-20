import styled from 'styled-components';

import { fadeIn } from '../../../styles/animations';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 3;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  animation: ${fadeIn} 0.2s ease-in;
`;

const ModalContent = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: ${({ theme }) => theme.color.white};
  opacity: 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  animation: ${fadeIn} 0.2s ease-in 0.05s forwards;
  transform: translate(-50%, -50%);
`;

export { ModalContainer, ModalBackdrop, ModalContent };
