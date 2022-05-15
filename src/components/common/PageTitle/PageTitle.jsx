import React from 'react';
import * as Styled from './PageTitle.style';

function PageTitle({ children }) {
  return <Styled.Title>{children}</Styled.Title>;
}

export default PageTitle;
