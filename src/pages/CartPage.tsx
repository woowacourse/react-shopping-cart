import { styled } from 'styled-components';
import Header from '../components/common/Header';
import Order from '../components/Order';

const CartPage = () => {
  return (
    <>
      <Header title="STORE" />
      <S.Main>
        <S.Title>장바구니</S.Title>
        <Order />
      </S.Main>
    </>
  );
};

const S = {
  Main: styled.main`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;
  `,

  Title: styled.h2`
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 4px solid var(--text-color);
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: var(--text-color);
  `,
};

export default CartPage;
