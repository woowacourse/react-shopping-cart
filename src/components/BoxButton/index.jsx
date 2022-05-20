import React from 'react';
import BoxButtonStyled from './style';

function BoxButton({ color, message, fontSize, width, height }) {
  return (
    <BoxButtonStyled color={color} fontSize={fontSize} width={width} height={height}>
      {message}
    </BoxButtonStyled>
  );
}

export default BoxButton;
