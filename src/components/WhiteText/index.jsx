import React from 'react';

import WhiteTextStyled from './style';

const WhiteText = ({ fontSize, fontWeight, children }) => {
  return (
    <WhiteTextStyled fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </WhiteTextStyled>
  );
};

export default WhiteText;
