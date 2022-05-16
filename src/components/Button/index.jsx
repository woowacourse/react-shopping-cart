import React from 'react';

import ButtonStyled from './style';

function Button({ width, height, fontSize, fontWeight, color, border, children }) {
  return (
    <ButtonStyled
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      border={border}
    >
      {children}
    </ButtonStyled>
  );
}

export default Button;
