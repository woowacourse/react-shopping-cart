import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { API_PATH } from '../constants/api';
import { COLOR } from '../constants/color';
import useFetch from '../hooks/useFetch';
import { requestGetItemList } from '../request/request';
import { Loading, OrderListItemList, OrderListPaymentAmount, PageTitle } from '../components';
import { getTotalPrice } from '../utils/totalPrice';

const OrderListItemWrapper = styled.div`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 24px;
  border-bottom: none;
`;

const OrderListDetail = () => {
  const { state } = useLocation();
  const { isLoading, data } = useFetch({
    fetchFunc: () => requestGetItemList(`${API_PATH.ORDER_ITEM_LIST}/${state.id}`),
    isInitSetting: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>주문내역상세</PageTitle>
      <OrderListItemWrapper>
        <OrderListItemList orderId={data.order_id} orderListItemList={data.order_details} hasDetailLink={false} />
      </OrderListItemWrapper>
      <OrderListPaymentAmount price={getTotalPrice(data.order_details)} />
    </>
  );
};

export default OrderListDetail;
