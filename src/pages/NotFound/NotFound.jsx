import React from 'react';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';

function NotFound() {
  return (
    <PageTemplate>
      <ErrorMessage>😱 존재하지 않는 페이지입니다. 😱</ErrorMessage>
    </PageTemplate>
  );
}

export default NotFound;
