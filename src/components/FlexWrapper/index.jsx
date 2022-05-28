import React from 'react';

import FlexWrapperStyled from './style';

function FlexWrapper({ children, flexDirection, alignItems, justifyContent }) {
  return (
    <FlexWrapperStyled
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </FlexWrapperStyled>
  );
}

export default FlexWrapper;
