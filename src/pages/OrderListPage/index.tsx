import { VFC } from 'react';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/useFetch';
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
