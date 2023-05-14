import { styled } from 'styled-components';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <>
      <Header />
      <Style.Main>
        <Style.Content>
          <ProductList />
        </Style.Content>
      </Style.Main>
    </>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    justify-content: center;

    width: 100%;
    min-width: 992px;

    padding: 60px 30px;
    padding: 140px 30px 60px 30px;
  `,

  Content: styled.div`
    width: 932px;
  `,
};
