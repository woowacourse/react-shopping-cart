import React from 'react';
import BoxButtonStyled from './style';

function BoxButton({ message, fontSize, fontWeight, width, height }) {
  return (
    <BoxButtonStyled fontSize={fontSize} fontWeight={fontWeight} width={width} height={height}>
      {message}
    </BoxButtonStyled>
  );
}

export default BoxButton;
