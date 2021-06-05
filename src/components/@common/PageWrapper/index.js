import React from 'react';
import { Page, Container } from './index.styles';

const PageWrapper = ({ children, bg, noPadding = false }) => {
  return (
    <Page bg={bg}>
      <Container noPadding={noPadding}>{children}</Container>
    </Page>
  );
};

export default PageWrapper;
