import React from 'react';

import BlackTextStyled from './style';

function BlackText({ fontSize, fontWeight, textAlign, children }) {
  return (
    <BlackTextStyled fontSize={fontSize} fontWeight={fontWeight} textAlign={textAlign}>
      {children}
    </BlackTextStyled>
  );
}

export default BlackText;
