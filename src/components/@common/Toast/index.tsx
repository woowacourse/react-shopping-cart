import { useEffect, useState } from 'react';
import Svg from '../Svg';
import * as S from './Toast.styles';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
}

const Toast = ({ message, type }: ToastProps) => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsShown(false), 2000);
  }, []);

  return (
    <S.ToastWrapper type={type} $isShown={isShown}>
      <Svg type={type} width={20} height={20} />
      {message}
    </S.ToastWrapper>
  );
};

export default Toast;
