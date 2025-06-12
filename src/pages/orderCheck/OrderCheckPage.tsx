import { Header } from '@/components/common';
import { CartItemType } from '@/components/features/cart';
import { OrderCheckContents } from '@/components/features/order';
import { useLocation } from 'react-router';

interface LocationState {
  orderProducts: CartItemType[];
}

function isLocationState(data: any): data is LocationState {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.orderProducts) &&
    data.orderProducts.every(
      (item) =>
        typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number'
    )
  );
}

function OrderCheckPage() {
  const location = useLocation();
  const state = location.state;

  if (!isLocationState(state)) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <>
      <Header showBackButton={true} />
      <OrderCheckContents orderItems={state.orderProducts} />
    </>
  );
}

export default OrderCheckPage;
