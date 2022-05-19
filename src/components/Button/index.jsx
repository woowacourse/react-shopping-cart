import React from 'react';

import ButtonStyled from './style';

function Button(props) {
  return <ButtonStyled {...props}>{props.children}</ButtonStyled>;
}

export default Button;
