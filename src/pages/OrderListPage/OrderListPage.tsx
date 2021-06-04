import React, { ReactElement, useEffect } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Spinner from '../../components/shared/Spinner/Spinner';
import * as T from '../../types';
import Styled from './OrderListPage.styles';
import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';
import useCart from '../../hooks/useCart';

const OrderListPage = (): ReactElement => {
  const { onAdd } = useCart();

  const [{ data: orders, status }, fetchOrders] = useAxios(API.ORDERS);

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
    };
    fetchData();
  }, [fetchOrders]);

  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      {status === T.AsyncStatus.PENDING && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}

      {status !== T.AsyncStatus.PENDING && orders?.length === 0 ? (
        <Styled.NoResultMessage>📋 주문한 내역이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.OrderList>
          {orders?.map?.((order: T.Order) => (
            <Styled.Order key={order.orderId}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
                <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
              </Styled.OrderHeader>
              <Styled.PurchasedList>
                {order.orderDetails?.map?.((item: T.OrderItem) => (
                  <PurchasedItem key={`${order.orderId}-${item.productId}`} item={item} onClick={onAdd} />
                ))}
              </Styled.PurchasedList>
            </Styled.Order>
          ))}
        </Styled.OrderList>
      )}
    </Styled.Root>
  );
};

export default OrderListPage;
