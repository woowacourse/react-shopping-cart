import React from 'react';

import WhiteButtonStyled from './style';

const WhiteButton = ({ fontSize, fontWeight, children }) => {
  return (
    <WhiteButtonStyled fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </WhiteButtonStyled>
  );
};

export default WhiteButton;
