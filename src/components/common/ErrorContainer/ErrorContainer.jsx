import React from 'react';

import * as Styled from 'components/common/ErrorContainer/ErrorContainer.style';

function ErrorContainer({ children }) {
  return <Styled.Container>{children}</Styled.Container>;
}

export default ErrorContainer;
