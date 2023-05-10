import { ComponentPropsWithoutRef, KeyboardEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.css';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  closeModalByClick: () => void;
  closeModalByPress: (event: KeyboardEvent<HTMLElement>) => void;
}

const Modal = ({ children, closeModalByClick, closeModalByPress, ...attributes }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return createPortal(
    <div ref={modalRef} className={styles.container} tabIndex={0} onKeyDown={closeModalByPress}>
      <div className={styles.backdrop} onClick={closeModalByClick} />
      <div className={styles.content}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
