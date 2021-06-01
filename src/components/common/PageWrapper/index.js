import React from 'react';
import { Page, Container } from './index.styles';

const PageWrapper = ({ children, bg }) => {
  console.log(bg);
  return (
    <Page bg={bg}>
      <Container>{children}</Container>
    </Page>
  );
};

export default PageWrapper;
