import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import * as T from 'types';
import Styled from './Button.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: T.ButtonSize;
  bgColor?: string;
  text: string;
  textColor?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = (props: Props): ReactElement => {
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
