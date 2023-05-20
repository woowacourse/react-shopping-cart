import { styled } from 'styled-components';
import { Cart } from '../Cart';
import { Layout } from '../common/Layout';
import { OrderSummary } from '../OrderSummary';

export const ShoppingCart = () => {
  return (
    <Layout>
      <Style.PageTitle>장바구니</Style.PageTitle>
      <Style.Main>
        <Cart />
        <OrderSummary />
      </Style.Main>
    </Layout>
  );
};

const Style = {
  Main: styled.div`
    display: flex;

    padding-right: 20px;

    justify-content: space-between;
  `,

  PageTitle: styled.div`
    text-align: center;

    margin-bottom: 16px;
    padding: 30px 0;

    font-size: 32px;
    font-weight: 700;

    border-bottom: 4px solid var(--grey-400);
  `,
};
