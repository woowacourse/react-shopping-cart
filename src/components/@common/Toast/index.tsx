import { useEffect, useState } from 'react';
import Svg from '../Svg';
import * as S from './Toast.styles';
import useToast from 'src/hooks/useToast';

export interface ToastProps {
  id: number;
  message: string;
  type: 'error' | 'success';
}

const Toast = ({ id, message, type }: ToastProps) => {
  const { deleteToast } = useToast();

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const timmer = setTimeout(() => {
        setShow(false);
        setTimeout(() => deleteToast(id), 500);
      }, 2000);

      return () => {
        clearTimeout(timmer);
      };
    }
  }, [show]);

  return (
    <S.ToastWrapper type={type} show={show}>
      <Svg type={type} width={20} height={20} />
      {message}
    </S.ToastWrapper>
  );
};

export default Toast;
