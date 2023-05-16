import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styled, { CSSProp } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  css: CSSProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, ...props }: Props) => {
  return <S.Button {...props}>{children}</S.Button>;
};

const S = {
  Button: styled.button<{ css: CSSProp }>`
    cursor: pointer;

    ${(props) => props.css}
  `,
};

export default Button;
