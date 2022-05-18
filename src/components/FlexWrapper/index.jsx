import React from 'react';

import FlexWrapperStyled from './style';

function FlexWrapper({ children, alignItems, justifyContent }) {
  return (
    <FlexWrapperStyled alignItems={alignItems} justifyContent={justifyContent}>
      {children}
    </FlexWrapperStyled>
  );
}

export default FlexWrapper;
