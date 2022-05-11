import React from 'react';

import WhiteButtonStyled from './style';

function WhiteButton({ fontSize, fontWeight, children }) {
  return (
    <WhiteButtonStyled fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </WhiteButtonStyled>
  );
}

export default WhiteButton;
