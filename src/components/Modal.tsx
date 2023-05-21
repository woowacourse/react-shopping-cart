import {ReactNode, useEffect, MouseEvent} from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
`;

const ModalCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;

const Modal = ({isOpen, onClose, children}: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={handleModalContentClick}>
        <ModalCloseButtonWrapper>
          <button onClick={onClose}>X</button>
        </ModalCloseButtonWrapper>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
