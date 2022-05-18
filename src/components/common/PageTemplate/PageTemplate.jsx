import React from 'react';

import Header from 'components/common/Header/Header';

import * as Styled from 'components/common/PageTemplate/PageTemplate.style';

function PageTemplate({ children }) {
  return (
    <div className="app">
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </div>
  );
}

export default PageTemplate;
