import Svg from '../Svg';
import * as S from './Toast.styles';

export interface ToastProps {
  id:number
  message: string;
  type: 'error' | 'success';
  show:boolean;
}

const Toast = ({ message, type,show }: ToastProps) => {

  return (
      <S.ToastWrapper type={type} isShow={show}>
        <Svg type={type} width={20} height={20} isClickable={false} />
        {message}
      </S.ToastWrapper>
  );
};

export default Toast;
