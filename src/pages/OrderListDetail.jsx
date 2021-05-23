import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { API_PATH } from '../constants/api';
import { COLOR } from '../constants/color';
import { getTotalPrice } from '../utils/totalPrice';
import { OrderListItemList, OrderListPaymentAmount, PageTitle } from '../components';
import useGettingData from '../hooks/useGettingData';

const OrderListItemWrapper = styled.div`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 24px;
  border-bottom: none;
`;

const OrderListDetail = () => {
  const { state } = useLocation();
  const { data: orderDetailItemList } = useGettingData(`${API_PATH.ORDER_ITEM_LIST}/${state.id}`);

  return (
    <>
      <PageTitle>주문내역상세</PageTitle>
      <OrderListItemWrapper>
        <OrderListItemList
          orderId={orderDetailItemList.orderId}
          orderListItemList={orderDetailItemList.orderDetails}
          hasDetailLink={false}
        />
      </OrderListItemWrapper>
      <OrderListPaymentAmount price={getTotalPrice(orderDetailItemList.orderDetails)} />
    </>
  );
};

export default OrderListDetail;
