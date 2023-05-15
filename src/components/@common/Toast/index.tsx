import { useEffect, useState } from 'react';
import Svg from '../Svg';
import * as S from './Toast.styles';
import { ToastState, useToast } from './hooks/useToast';

const Toast = ({ id, message, type }: ToastState) => {
  const [isShown, setIsShown] = useState(true);
  const { deleteToast } = useToast();

  useEffect(() => {
    setTimeout(() => setIsShown(false), 2000);
    if (!isShown) {
      setTimeout(() => deleteToast(id), 500);
    }
  }, [isShown]);

  return (
    <S.ToastWrapper type={type} $isShown={isShown}>
      <Svg type={type} width={20} height={20} />
      {message}
    </S.ToastWrapper>
  );
};

export default Toast;
