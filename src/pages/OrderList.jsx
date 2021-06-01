import React from 'react';
import styled from 'styled-components';
import useGettingData from '../hooks/useGettingData';
import useScrollPosition from '../hooks/useScrollPosition';
import { COLOR } from '../constants/color';
import { API_PATH } from '../constants/api';
import { PATH } from '../constants/path';
import { PageTitle, OrderItemList } from '../components';

const Container = styled.div`
  background-color: ${COLOR.GRAY_150};
`;

const Content = styled.div`
  ${({ theme }) => theme.content.default}
`;

const ItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const { data: orderItemList } = useGettingData(API_PATH.ORDER_ITEM_LIST);

  useScrollPosition(PATH.ORDER_LIST);

  return (
    <Container>
      <Content>
        <PageTitle>주문목록</PageTitle>
        <ul>
          {orderItemList.map(({ orderId, orderDetails }) => (
            <ItemListWrapper key={orderId}>
              <OrderItemList orderItemList={orderDetails} orderId={orderId} />
            </ItemListWrapper>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default OrderList;
