import { styled } from 'styled-components';
import type { PropsWithChildren } from 'react';

interface ModalProps {
  title: string;
  onCloseModal: () => void;
}

const Modal = ({
  title,
  onCloseModal,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <>
      <ModalBackground />
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton type="button" onClick={onCloseModal}>
            ✕
          </ModalCloseButton>
        </ModalHeader>
        {children}
      </ModalContainer>
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;

  width: 480px;
  height: 505px;

  background-color: #fff;

  border-radius: 8px;

  overflow: hidden;
  transform: translate(50%, -50%);
`;

const ModalHeader = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 57px;
  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  font-weight: 500;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 16px;

  border: none;
  background: none;

  font-size: 18px;

  cursor: pointer;
`;

export default Modal;
