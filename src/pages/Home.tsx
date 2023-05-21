import { Suspense } from 'react';
import { styled } from 'styled-components';
import Header from '../components/Header';
import ProductList from '../components/product/ProductList';
import { Loading } from '../components/common/Spinner/Loading';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Style.Main>
        <Style.Content>
          <ProductList />
        </Style.Content>
      </Style.Main>
    </Suspense>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    justify-content: center;

    width: 100%;
    min-width: 992px;

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
