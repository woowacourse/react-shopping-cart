import React from 'react';
import styled from 'styled-components';
import useGettingData from '../hooks/useGettingData';
import { useLocation } from 'react-router';
import { API_PATH } from '../constants/api';
import { COLOR } from '../constants/color';
import { getTotalPrice } from '../utils/totalPrice';
import { OrderItemList, OrderListPaymentAmount, PageTitle } from '../components';

const Container = styled.div`
  min-height: inherit;
  background-color: ${COLOR.GRAY_150};
`;

const Content = styled.div`
  ${({ theme }) => theme.content.default}
`;

const OrderItemListWrapper = styled.div`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 24px;
  border-bottom: none;
`;

const OrderListDetail = () => {
  const { state } = useLocation();
  const { data: orderDetailItemList } = useGettingData(`${API_PATH.ORDER_ITEM_LIST}/${state.id}`);

  return (
    <Container>
      <Content>
        <PageTitle>주문내역상세</PageTitle>
        <OrderItemListWrapper>
          <OrderItemList
            orderId={orderDetailItemList.orderId}
            orderItemList={orderDetailItemList.orderDetails}
            hasDetailLink={false}
          />
        </OrderItemListWrapper>
        <OrderListPaymentAmount price={getTotalPrice(orderDetailItemList.orderDetails)} />
      </Content>
    </Container>
  );
};

export default OrderListDetail;
