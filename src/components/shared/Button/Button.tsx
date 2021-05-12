import React from 'react';
import Styled from './Button.styles';
import * as T from '../../../types';

type ButtonProps = {
  size?: T.ButtonSize;
  bgColor?: string;
  text: string;
  textColor?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { size, bgColor, text, textColor, disabled } = props;

  return (
    <Styled.Root size={size} bgColor={bgColor} textColor={textColor} disabled={disabled}>
      {text}
    </Styled.Root>
  );
};

Button.defaultProps = {
  size: T.ButtonSize.REGULAR,
  bgColor: '',
  textColor: '',
  disabled: false,
};

export default Button;
