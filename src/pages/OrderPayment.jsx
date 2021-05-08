import React from 'react';
import styled from 'styled-components';
import OrderListItem, { TYPE as ORDER_LIST_ITEM_TYPE } from '../components/orderListItem/OrderListItem';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE as PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, {
  TYPE as SELECTED_PRODUCT_LIST_TYPE,
} from '../components/selectedProductList/SelectedProductList';

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 25px;
  padding: 0 18px;
`;

const OrderPaymentAmountWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;

const OrderPayment = ({ productListState }) => (
  <>
    <PageTitle>주문/결제</PageTitle>
    <Content>
      <div>
        <SelectedProductList
          listType={SELECTED_PRODUCT_LIST_TYPE.ORDER_PAYMENT}
          itemType={ORDER_LIST_ITEM_TYPE.ORDER_PAYMENT}
          productList={productListState}
          ListItem={OrderListItem}
        />
      </div>
      <OrderPaymentAmountWrapper>
        <PaymentAmount type={PAYMENT_AMOUNT_TYPE.ORDER_PAYMENT} price={325000} />
      </OrderPaymentAmountWrapper>
    </Content>
  </>
);

export default OrderPayment;
