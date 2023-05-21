import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { TOAST_SHOW_DURATION } from '../../../constants';
import * as S from './Toast.styles';

export interface ToastProps extends PropsWithChildren {
  status?: 'success' | 'error';
}

const Toast = ({ status = 'success', children }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), TOAST_SHOW_DURATION);
  }, []);

  return createPortal(
    <S.ToastWrapper
      role="alert"
      aria-live="assertive"
      className={show ? '' : 'hide'}
      status={status}
    >
      {children}
    </S.ToastWrapper>,
    document.body
  );
};

export default Toast;
