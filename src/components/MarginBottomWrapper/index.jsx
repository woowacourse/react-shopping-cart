import React from 'react';

import MarginBottomWrapperStyled from './style';

function MarginBottomWrapper({ marginBottom, children }) {
  return (
    <MarginBottomWrapperStyled marginBottom={marginBottom}>{children}</MarginBottomWrapperStyled>
  );
}

export default MarginBottomWrapper;
