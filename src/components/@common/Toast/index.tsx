import { useEffect, useState } from 'react';
import Svg from '../Svg';
import * as S from './Toast.styles';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
}

const Toast = ({ message, type }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return (
      <S.ToastWrapper type={type} isShow={show}>
        <Svg type={type} width={20} height={20} />
        {message}
      </S.ToastWrapper>
  );
};

export default Toast;
