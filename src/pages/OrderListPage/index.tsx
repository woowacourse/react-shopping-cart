import { FC } from 'react';
import Loading from '../../components/Loading';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/useFetch';
import { requestOrders } from '../../service/request/order';
import { Order } from '../../types';

const OrderListPage: FC = () => {
  const orders = useFetch(requestOrders);

  return (
    <ReactShoppingCartTemplate title="주문 목록">
      {orders.isLoading ? (
        <Loading />
      ) : (
        <OrderItemListSections orders={[...(orders.data as Order[])].reverse()} />
      )}
    </ReactShoppingCartTemplate>
  );
};

export default OrderListPage;
