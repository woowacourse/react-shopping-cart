import React from 'react';
import BoxButtonStyled from './style';

function BoxButton({ color, message, fontColor, fontSize, width, height, border }) {
  return (
    <BoxButtonStyled
      color={color}
      fontColor={fontColor}
      fontSize={fontSize}
      width={width}
      height={height}
      border={border}
    >
      {message}
    </BoxButtonStyled>
  );
}

export default BoxButton;
