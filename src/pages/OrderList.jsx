import React from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import useScrollPosition from '../hooks/useScrollPosition';
import { COLOR } from '../constants/color';
import { API_PATH } from '../constants/api';
import { requestGetItemList } from '../request/request';
import { PageTitle, Loading, OrderListItemList } from '../components';

const ItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const { isLoading, data: orderListItemList } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.ORDER_ITEM_LIST),
    isInitSetting: true,
  });

  useScrollPosition(!isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <ul>
        {orderListItemList.reverse().map(({ orderId, orderDetails }) => (
          <ItemListWrapper key={orderId}>
            <OrderListItemList orderListItemList={orderDetails} orderId={orderId} />
          </ItemListWrapper>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
