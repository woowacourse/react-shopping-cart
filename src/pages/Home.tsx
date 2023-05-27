import { Suspense, lazy } from 'react';
import { styled } from 'styled-components';

const ProductList = lazy(() => import('../components/product/ProductList'));

export default function Home() {
  return (
    <Style.Main>
      <Style.Content>
        <Suspense fallback={<p>상품 목록을 로딩 중입니다...</p>}>
          <ProductList />
        </Suspense>
      </Style.Content>
    </Style.Main>
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
