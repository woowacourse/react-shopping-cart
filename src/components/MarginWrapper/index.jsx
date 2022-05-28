import React from 'react';

import MarginWrapperStyled from './style';

function MarginWrapper({ children, marginTop, marginRight, marginBottom }) {
  return (
    <MarginWrapperStyled
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {children}
    </MarginWrapperStyled>
  );
}

export default MarginWrapper;
