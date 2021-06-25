import { FC } from 'react';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import InitialLoading from '../../components/shared/InitialLoading';
import RootTemplate from '../../components/shared/RootTemplate';
import useRequest from '../../hooks/shared/useRequest';
import { getOrderItemList } from '../../service/order';
import { Order } from '../../types';

const OrderListPage: FC = () => {
  const orders = useRequest(getOrderItemList);

  return (
    <RootTemplate title="주문 목록">
      <InitialLoading isLoading={orders.isLoading}>
        <OrderItemListSections orders={orders.data as Order[]} />
      </InitialLoading>
    </RootTemplate>
  );
};

export default OrderListPage;
