import React from 'react';
import * as Styled from './ErrorContainer.style';

function ErrorContainer({ children }) {
  return <Styled.Container>{children}</Styled.Container>;
}

export default ErrorContainer;
