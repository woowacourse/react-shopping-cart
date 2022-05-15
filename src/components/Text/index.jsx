import React from 'react';

import TextStyled from './style';

function Text({ color, fontSize, fontWeight, children }) {
  return (
    <TextStyled color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </TextStyled>
  );
}

export default Text;
