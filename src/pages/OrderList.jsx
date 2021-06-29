import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageTitle from '../components/pageTitle/PageTitle';
import { COLOR } from '../constants/color';
import { useDispatch } from 'react-redux';
import { fetchOrderItemList } from '../redux/orderList';
import OrderItemList from '../components/orderList/OrderItemList';
import useOrderList from '../hooks/useOrderList';

const OrderItemListWrapper = styled.li`
  border: 2px solid ${COLOR.GRAY_200};
  margin-bottom: 76px;
  border-bottom: none;
`;

const OrderList = () => {
  const orderItemList = useOrderList();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderItemList());
  }, [dispatch]);

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <ul>
        {orderItemList.map(({ order_id, order_details }) => (
          <OrderItemListWrapper key={order_id}>
            <OrderItemList orderDetailItemList={order_details} order_id={order_id}></OrderItemList>
          </OrderItemListWrapper>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
