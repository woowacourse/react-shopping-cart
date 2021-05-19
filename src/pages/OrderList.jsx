import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants/color';
import { API_PATH } from '../constants/api';
import { requestGetItemList } from '../request/request';
import useFetch from '../hooks/useFetch';
import { PageTitle, Loading, OrderListItemList } from '../components';

const ItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const {
    isLoading,
    data: orderListItemList,
    error,
  } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.ORDER_ITEM_LIST),
    isInitSetting: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <ul>
        {orderListItemList.reverse().map(({ order_id, order_details }) => (
          <ItemListWrapper key={order_id}>
            <OrderListItemList orderListItemList={order_details} orderId={order_id} />
          </ItemListWrapper>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
