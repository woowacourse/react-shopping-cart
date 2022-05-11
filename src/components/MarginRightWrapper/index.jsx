import React from 'react';

import MarginRightWrapperStyled from './style';

function MarginRightWrapper({ marginRight, children }) {
  return <MarginRightWrapperStyled marginRight={marginRight}>{children}</MarginRightWrapperStyled>;
}

export default MarginRightWrapper;
