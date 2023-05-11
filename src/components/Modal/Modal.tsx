import { ComponentPropsWithoutRef, KeyboardEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useScrollStop } from '../../hooks/useScrollStop';
import styles from './style.module.css';

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
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={handleClose} />
      <div ref={modalRef} className={styles.content} tabIndex={0} onKeyDown={handleClosePress}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
