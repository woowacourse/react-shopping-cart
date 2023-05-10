import { ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.css';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {}

const Modal = ({ children, ...attributes }: ModalProps) => {
  return createPortal(
    <div className={styles.container}>
      <div className={styles.backdrop} />
      <div className={styles.content}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
