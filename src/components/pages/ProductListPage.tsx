import styled from 'styled-components';
import { Header, ProductList } from '../../components';
import mockProduct from '../../../public/assets/mockProducts.json';

export default function ProductListPage() {
  const products = mockProduct;

  return (
    <S.Wrapper>
      <Header />
      <main>
        <ProductList products={products} />
      </main>
    </S.Wrapper>
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
    width: 1272px;
    padding: 60px 0;
  }
`;

const S = {
  Wrapper,
};
