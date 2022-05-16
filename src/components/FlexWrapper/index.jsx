import React from 'react';

import FlexWrapperStyled from './style';

function FlexWrapper(props) {
  return <FlexWrapperStyled {...props}>{props.children}</FlexWrapperStyled>;
}

export default FlexWrapper;
