import { styled } from 'styled-components';
import Header from '../components/Header';
import CartList from '../components/cart/CartList';

export default function Cart() {
  return (
    <>
      <Header />
      <Style.Main>
        <Style.Title>장바구니</Style.Title>
        <Style.Content>
          <CartList />
        </Style.Content>
      </Style.Main>
    </>
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
  `,

  Title: styled.h2`
    width: 932px;

    border-bottom: 4px solid var(--grey-400);
    padding: 30px 0;
    margin-bottom: 30px;

    font-size: 24px;
    color: var(--grey-400);
    text-align: center;
  `,

  Content: styled.div``,
};
