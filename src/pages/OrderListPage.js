import React from 'react';
import PageTitle from '../components/PageTitle';
import PageMessage from '../components/PageMessage';

import emptyMessageImage from '../asset/empty-message.png';

function OrderListPage() {
  return (
    <>
      <PageTitle pageTitle="주문목록" />
      <PageMessage image={emptyMessageImage} alt="준비중인 페이지" message="죄송합니다. 현재 준비중인 페이지 입니다." />
    </>
  );
}

export default OrderListPage;
