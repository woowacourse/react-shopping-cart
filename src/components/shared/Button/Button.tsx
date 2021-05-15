import React from 'react';
import * as T from 'types';
import Styled from './Button.styles';

type ButtonProps = {
  size?: T.ButtonSize;
  bgColor?: string;
  text: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { size, bgColor, text, textColor, onClick, disabled } = props;

  return (
    <Styled.Root size={size} bgColor={bgColor} textColor={textColor} onClick={onClick} disabled={disabled}>
      {text}
    </Styled.Root>
  );
};

Button.defaultProps = {
  size: T.ButtonSize.REGULAR,
  bgColor: '',
  textColor: '',
  onClick: () => {},
  disabled: false,
};

export default Button;
