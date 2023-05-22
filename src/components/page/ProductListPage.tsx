import styled from 'styled-components';

import Header from '../common/Header';
import ProductList from '../productList/ProductList';

export default function ProductListPage() {
  return (
    <Wrapper>
      <Header />
      <main>
        <ProductList />
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding-top: 80px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;
    padding: 60px 0;
  }
`;
