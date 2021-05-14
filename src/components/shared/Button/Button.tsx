import React, { ButtonHTMLAttributes } from 'react';
import Styled from './Button.styles';
import * as T from '../../../types';

type ButtonProps = {
  size?: T.ButtonSize;
  bgColor?: string;
  text: string;
  textColor?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { size, bgColor, text, textColor, onClick } = props;

  return (
    <Styled.Root size={size} bgColor={bgColor} textColor={textColor} onClick={onClick} {...props}>
      {text}
    </Styled.Root>
  );
};

Button.defaultProps = {
  size: T.ButtonSize.REGULAR,
  bgColor: '',
  textColor: '',
  onClick: () => {},
};

export default Button;
