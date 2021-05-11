import { VFC } from 'react';
import { couldStartTrivia } from 'typescript';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/useFetch';
import { ORDERS_MOCK } from '../../mocks/mockData';
import { requestOrders } from '../../service/request/order';
import { Order } from '../../types';

const OrderListPage: VFC = () => {
  const { data, isLoading, hasError } = useFetch(requestOrders);

  return (
    <ReactShoppingCartTemplate title="주문 목록">
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <OrderItemListSections orders={[...(data as Order[])].reverse()} />
      )}
    </ReactShoppingCartTemplate>
  );
};

export default OrderListPage;
