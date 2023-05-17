import { styled } from 'styled-components';
import Header from '../components/Header';
import ProductList from '../components/product/ProductList';

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

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Content: styled.div`
    width: 932px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
