import { KeyboardEvent, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { ESC_KEY } from '../../../constants';
import { useScrollStop } from '../../../hooks/common/useScrollStop';
import * as S from './Modal.styles';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ isOpen, children, handleClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useScrollStop(isOpen);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleClosePress = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === ESC_KEY) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <>
      {isOpen &&
        createPortal(
          <S.ModalContainer role="dialog" aria-modal>
            <S.ModalBackdrop onClick={handleClose} />
            <S.ModalContent
              ref={modalRef}
              tabIndex={0}
              onKeyDown={handleClosePress}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {children}
            </S.ModalContent>
          </S.ModalContainer>,
          document.body
        )}
    </>
  );
};

export default Modal;
