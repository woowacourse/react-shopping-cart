import React from 'react';
import { ErrorContainer, PageTemplate } from 'components/common';

function NotFound() {
  return (
    <PageTemplate>
      <ErrorContainer>😱 존재하지 않는 페이지입니다. 😱</ErrorContainer>
    </PageTemplate>
  );
}

export default NotFound;
