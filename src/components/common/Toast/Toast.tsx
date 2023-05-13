import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as S from './Toast.styles';

export interface ToastProps extends PropsWithChildren {
  status: 'success' | 'error';
}

const Toast = ({ status, children }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return createPortal(
    <S.ToastWrapper className={show ? '' : 'hide'} status={status}>
      {children}
    </S.ToastWrapper>,
    document.body
  );
};

export default Toast;
