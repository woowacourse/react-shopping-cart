import { ButtonHTMLAttributes } from 'react';
import * as S from './styled';

type ButtonType = React.FC<ButtonHTMLAttributes<HTMLButtonElement>>;

const WideButton: ButtonType = ({ children, ...restProps }) => {
  return <S.Button {...restProps}>{children}</S.Button>;
};

export default WideButton;
