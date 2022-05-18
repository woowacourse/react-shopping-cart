import React from 'react';

import TextStyled from './style';

function Text({ onClick, id, color, fontSize, fontWeight, cursor, children }) {
  return (
    <TextStyled
      onClick={onClick}
      id={id}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      cursor={cursor}
    >
      {children}
    </TextStyled>
  );
}

export default Text;
