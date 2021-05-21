import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import Styled from './Button.styles';
import * as T from '../../../types';

type ButtonProps = {
  size?: T.ButtonSize;
  bgColor?: string;
  text: string;
  textColor?: string;
  fullWidth?: boolean;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps): ReactElement => {
  const {
    size = T.ButtonSize.REGULAR,
    bgColor = '',
    text,
    textColor = '',
    fullWidth = false,
    onClick = () => {},
  } = props;

  return (
    <Styled.Root size={size} bgColor={bgColor} textColor={textColor} fullWidth={fullWidth} onClick={onClick} {...props}>
      {text}
    </Styled.Root>
  );
};

export default Button;
