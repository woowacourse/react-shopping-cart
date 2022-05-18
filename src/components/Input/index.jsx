import React from 'react';
import InputStyled from './style';

function Input({ type, width, height, border, background, fontSize }) {
  return (
    <InputStyled
      type={type}
      width={width}
      height={height}
      border={border}
      background={background}
      fontSize={fontSize}
    />
  );
}

export default Input;
