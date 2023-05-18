import styled from 'styled-components';
import { Layout } from '../layout';
import { ProductSelectSection } from '../components/cart/productList/ProductListSection';
import { OrderSummarySection } from '../components/cart/orderSummarySection/OrderSummarySection';

export const Cart = () => {
  return (
    <Layout>
      <Style.Header>
        <Style.HeaderTitle>장바구니</Style.HeaderTitle>
      </Style.Header>
      <Style.Content>
        <ProductSelectSection></ProductSelectSection>
        <OrderSummarySection></OrderSummarySection>
      </Style.Content>
    </Layout>
  );
};

const Style = {
  Header: styled.div`
    width: 1320px;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;
  `,
  Content: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    gap: 104px;
  `,
};
