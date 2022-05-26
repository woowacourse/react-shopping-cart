import React from 'react';

import { PageTemplate, Pagination } from 'components/common';
import { ProductList } from 'components/product';

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
