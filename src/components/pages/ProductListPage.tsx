import styled from 'styled-components';
import { Header, ProductList } from '../../components';
import mockProduct from '../../../public/assets/mockProducts.json';

export default function ProductListPage() {
  const products = mockProduct;

  return (
    <S.Wrapper>
      <Header />
      <S.Main>
        <ProductList products={products} />
      </S.Main>
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
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: auto;

  padding: 60px 0;
`;

const S = {
  Wrapper,
  Main,
};
