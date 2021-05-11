import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import OrderListItem, { ORDER_LIST_ITEM_TYPE } from '../components/orderListItem/OrderListItem';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, { SELECTED_PRODUCT_LIST_TYPE } from '../components/selectedProductList/SelectedProductList';
import { insertOrderItemList } from '../modules/orderList';

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

const OrderPayment = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { orderPaymentList: orderItemList, totalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await fetch('http://localhost:4000/orderItemList', {
      method: 'POST',
      body: JSON.stringify(orderItemList),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    dispatch(insertOrderItemList(orderItemList));

    history.push('./orderList');
  };

  return (
    <>
      <PageTitle>주문/결제</PageTitle>
      <Content>
        <div>
          <SelectedProductList
            listType={SELECTED_PRODUCT_LIST_TYPE.ORDER_PAYMENT}
            itemType={ORDER_LIST_ITEM_TYPE.ORDER_PAYMENT}
            productList={orderItemList}
            ListItem={OrderListItem}
          />
        </div>
        <OrderPaymentAmountWrapper>
          <PaymentAmount
            type={PAYMENT_AMOUNT_TYPE.ORDER_PAYMENT}
            price={totalPrice}
            onClick={handleOrderListPageRouter}
          />
        </OrderPaymentAmountWrapper>
      </Content>
    </>
  );
};

export default OrderPayment;
