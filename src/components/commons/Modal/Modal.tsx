import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  initIsOpenModal: boolean;
  children: (handleModalClose: () => void) => ReactNode;
}

const Modal = (props: ModalProps) => {
  const { initIsOpenModal, children } = props;
  const [isOpenModal, setIsOpenModal] = useState(initIsOpenModal);

  const handleModalClose = () => setIsOpenModal(false);

  if (!isOpenModal) {
    return null;
  }

  return createPortal(children(handleModalClose), document.body);
};

export default Modal;
