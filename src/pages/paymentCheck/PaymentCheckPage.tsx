import { Header } from '@/components/common';
import { PaymentCheckContents } from '@/components/features/payment';
import { useLocation } from 'react-router';

interface LocationState {
  orderItemQuantity: number;
  totalProductQuantity: number;
  paymentPrice: number;
}

function isLocationState(data: any): data is LocationState {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.orderItemQuantity === 'number' &&
    typeof data.totalProductQuantity === 'number' &&
    typeof data.paymentPrice === 'number'
  );
}

function PaymentCheckPage() {
  const location = useLocation();
  const state = location.state;

  if (!isLocationState(state)) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <>
      <Header />
      <PaymentCheckContents
        orderItemsQuantity={state.orderItemQuantity}
        totalProductQuantity={state.totalProductQuantity}
        paymentPrice={state.paymentPrice}
      />
    </>
  );
}

export default PaymentCheckPage;
