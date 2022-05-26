import React from 'react';

import * as Styled from 'components/common/PageTitle/PageTitle.style';

function PageTitle({ children }) {
  return <Styled.Title>{children}</Styled.Title>;
}

export default PageTitle;
