import { ButtonHTMLAttributes } from 'react';
import * as S from './styled';

type ButtonType = React.FC<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button: ButtonType = ({ children, ...restProps }) => {
  return (
    <S.Button type="button" {...restProps}>
      {children}
    </S.Button>
  );
};

export default Button;
