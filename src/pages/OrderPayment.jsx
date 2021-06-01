import React from 'react';
import styled from 'styled-components';
import useGettingData from '../hooks/useGettingData';
import useScrollPosition from '../hooks/useScrollPosition';
import { useHistory, useLocation } from 'react-router';
import { PATH } from '../constants/path';
import { requestInsertItem } from '../request/request';
import { API_PATH } from '../constants/api';
import { PageTitle, OrderPaymentAmount, OrderPaymentItemList } from '../components';
import useSnackbar from '../hooks/useSnackbar';
import { MESSAGE } from '../constants/message';

const Container = styled.div`
  ${({ theme }) => theme.content.default}
`;

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 25px;
  padding: 0 18px;
  gap: 100px;
`;

const OrderPaymentAmountWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const OrderPayment = () => {
  const { mutate } = useGettingData(API_PATH.ORDER_ITEM_LIST);

  const { showSnackbar } = useSnackbar();

  const { state } = useLocation();
  const history = useHistory();

  useScrollPosition(PATH.ORDER_PAYMENT);

  const { orderPaymentItemList, totalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await requestInsertItem(
      API_PATH.ORDER_ITEM_LIST,
      orderPaymentItemList.map(({ cartId, quantity }) => ({ cartId, quantity }))
    );

    mutate();

    showSnackbar({ message: MESSAGE.SUCCESS.ORDER_SHOPPING_CART_ITEM });

    history.replace(PATH.ORDER_LIST);
  };

  return (
    <Container>
      <PageTitle>주문/결제</PageTitle>
      <Content>
        <div>
          <OrderPaymentItemList orderPaymentItemList={orderPaymentItemList} />
        </div>
        <div>
          <OrderPaymentAmountWrapper>
            <OrderPaymentAmount price={totalPrice} onClick={handleOrderListPageRouter} />
          </OrderPaymentAmountWrapper>
        </div>
      </Content>
    </Container>
  );
};

export default OrderPayment;
