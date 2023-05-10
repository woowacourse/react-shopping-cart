import { styled } from 'styled-components';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <>
      <Header />
      <Style.Main>
        <ProductList />
      </Style.Main>
    </>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    justify-content: center;

    padding: 60px 0;
  `,
};
