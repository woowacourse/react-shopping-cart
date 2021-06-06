import React, { ReactElement } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Spinner from '../../components/shared/Spinner/Spinner';
import * as T from '../../types';
import Styled from './OrderListPage.styles';
import useCart from '../../hooks/useCart';
import useOrder from '../../hooks/useOrder';

const OrderListPage = (): ReactElement => {
  const { onAdd } = useCart();
  const { data: orders, status } = useOrder();

  const isInitialLoading = status === T.AsyncStatus.PENDING && orders?.length === 0;
  const isEmptyData = status === T.AsyncStatus.SUCCESS && orders?.length === 0;

  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      {isInitialLoading && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}

      {isEmptyData ? (
        <Styled.NoResultMessage>📋 주문한 내역이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.OrderList>
          {orders?.map?.((order: T.Order) => (
            <Styled.Order key={order.orderId}>
              <Styled.OrderHeader>
                <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
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
