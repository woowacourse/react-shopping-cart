import { ComponentPropsWithoutRef, KeyboardEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useScrollStop } from '../../../hooks/useScrollStop';
import * as S from './Modal.styles';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  handleClose: () => void;
  handleClosePress: (event: KeyboardEvent<HTMLElement>) => void;
}

const Modal = ({ children, handleClose, handleClosePress }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useScrollStop(true);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return createPortal(
    <S.ModalContainer role="dialog" aria-modal>
      <S.ModalBackdrop onClick={handleClose} />
      <S.ModalContent ref={modalRef} tabIndex={0} onKeyDown={handleClosePress}>
        {children}
      </S.ModalContent>
    </S.ModalContainer>,
    document.body
  );
};

export default Modal;
