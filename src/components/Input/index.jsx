import React from 'react';
import CheckboxStyled from './style';

function Input({ type, width, height, border, background }) {
  return (
    <CheckboxStyled
      type={type}
      width={width}
      height={height}
      boder={border}
      background={background}
    />
  );
}

export default Input;
