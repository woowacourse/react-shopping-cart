import { useEffect, VFC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useCart from '../../../service/hooks/useCart';
import { Order } from '../../../types';
import { FetchError } from '../../../utils/error';
import OrderItemListSection from './OrderItemListSection';

interface Props {
  orders: Order[];
}

const OrderItemListSections: VFC<Props> = ({ orders }) => {
  const { error, clearError } = useCart();

  useEffect(() => {
    if (error && (error as FetchError).functionName === 'requestAddCartItem') {
      alert('장바구니 담기에 실패했습니다.');
      clearError();
    }
  }, [error]);

  return (
    <>
      {orders.map((order) => (
        <OrderItemListSection key={order.orderId} order={order} />
      ))}
    </>
  );
};

export default OrderItemListSections;
