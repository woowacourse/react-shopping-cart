import React from 'react';

import PageTemplate from 'components/common/PageTemplate/PageTemplate';
import ProductList from 'components/product/ProductList/ProductList';
import Pagination from 'components/common/Pagination/Pagination';

import * as Styled from 'pages/Home/Home.style';

function Home() {
  return (
    <PageTemplate>
      <Styled.Container>
        <ProductList />
        <Pagination />
      </Styled.Container>
    </PageTemplate>
  );
}

export default Home;
