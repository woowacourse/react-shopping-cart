import React from 'react';
import TitleStyled from './style';

function Title(props) {
  return <TitleStyled {...props}>{props.children}</TitleStyled>;
}

export default Title;
