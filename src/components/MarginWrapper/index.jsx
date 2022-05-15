import React from 'react';
import MarginWrapperStyled from './style';

function MarginWrapper(props) {
  return <MarginWrapperStyled {...props}>{props.children}</MarginWrapperStyled>;
}

export default MarginWrapper;
