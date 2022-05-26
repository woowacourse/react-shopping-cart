import React from 'react';

import SunTitleStyled from './style';

function SubTitle(props) {
  return <SunTitleStyled {...props}>{props.children}</SunTitleStyled>;
}

export default SubTitle;
