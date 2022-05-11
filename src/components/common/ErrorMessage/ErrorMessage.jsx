import React from 'react';
import * as Styled from './ErrorMessage.style';

function ErrorMessage({ children }) {
  return <Styled.Container>{children}</Styled.Container>;
}

export default ErrorMessage;
