import React from 'react';
import * as Styled from './PageTemplate.style';
import Header from '../Header/Header';

function PageTemplate({ children }) {
  return (
    <>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
}

export default PageTemplate;
