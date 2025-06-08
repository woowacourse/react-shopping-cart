import { PropsWithChildren, useEffect } from 'react';
import { modalLayout } from './Modal.style';

interface ModalProps {
  open: boolean;
}

export function Modal({ children, open }: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return <>{open ? <div css={modalLayout}>{children}</div> : null}</>;
}
