import React from 'react';
import PageMessage from '../components/PageMessage';

import notFoundImg from '../asset/not-found.jpeg';

function NotFoundPage() {
  return (
    <PageMessage
      image={notFoundImg}
      alt="없는 페이지"
      message="죄송합니다. 페이지가 존재하지 않거나, 현재 이용할 수 없는 페이지 입니다."
    />
  );
}

export default NotFoundPage;
