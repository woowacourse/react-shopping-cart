import { ComponentPropsWithoutRef, KeyboardEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.css';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  closeModalByClick: () => void;
  closeModalByPress: (event: KeyboardEvent<HTMLElement>) => void;
}

const Modal = ({ children, closeModalByClick, closeModalByPress }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return createPortal(
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={closeModalByClick} />
      <div ref={modalRef} className={styles.content} tabIndex={0} onKeyDown={closeModalByPress}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
