import { styled } from 'styled-components';
import Order from '../components/cart/Order';
import SelectedProductList from '../components/cart/SelectedProductList';
import Header from '../components/common/Header';

const CartPage = () => {
  return (
    <>
      <Header title="STORE" />
      <S.Main>
        <S.Title>장바구니</S.Title>
        <S.Wrapper>
          <SelectedProductList />
          <Order />
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const S = {
  Main: styled.main`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 1270px) {
      padding: 0 36px;
    }

    @media (max-width: 420px) {
      padding: 0 28px;
    }
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

  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 36px 30px 0 0;

    @media (max-width: 1270px) {
      flex-direction: column;
      margin-right: 0;

      & section {
        max-width: 100%;
      }

      & section:last-child {
        margin: 30px 0 80px;
      }
    }
  `,
};

export default CartPage;
