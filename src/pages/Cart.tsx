import { Suspense } from 'react';
import { styled } from 'styled-components';
import Header from '../components/Header';
import CartList from '../components/cart/CartList';
import { Loading } from '../components/common/Spinner/Loading';

export default function Cart() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Style.Main>
        <Style.Title>장바구니</Style.Title>
        <CartList />
      </Style.Main>
    </Suspense>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 992px;

    padding: 80px 30px 60px 30px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Title: styled.h2`
    width: 932px;

    border-bottom: 4px solid var(--grey-400);
    padding: 30px 0;
    margin-bottom: 30px;

    font-size: 24px;
    color: var(--grey-400);
    text-align: center;

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
