import React from 'react';

import MarginWrapperStyled from './style';

function MarginWrapper({ children, marginRight, marginBottom }) {
  return (
    <MarginWrapperStyled marginRight={marginRight} marginBottom={marginBottom}>
      {children}
    </MarginWrapperStyled>
  );
}

export default MarginWrapper;
