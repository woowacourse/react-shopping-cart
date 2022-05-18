import React from 'react';

import BlackTextStyled from './style';

function BlackText({ fontSize, fontWeight, children }) {
  return (
    <BlackTextStyled fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </BlackTextStyled>
  );
}

export default BlackText;
