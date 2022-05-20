import React from 'react';

import InputStyled from './style';

const Input = React.forwardRef((props, ref) => {
  return <InputStyled ref={ref} {...props} />;
});

export default Input;
