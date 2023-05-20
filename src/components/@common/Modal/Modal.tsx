import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

export type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ children, isOpen, closeModal }: PropsWithChildren<ModalProps>) => {
  return (
    <>
      {isOpen
        ? createPortal(
            <ModalContainer role="dialog">
              <ModalOverlay onClick={closeModal} />
              <ModalContent>{children}</ModalContent>
            </ModalContainer>,
            document.body
          )
        : null}
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 203;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: #00000059;
`;

const ModalContent = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 201;
  transform: translate(-50%, 50%);
  border-radius: 8px;
  background-color: #fff;
`;
