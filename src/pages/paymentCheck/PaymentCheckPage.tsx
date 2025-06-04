import { Header } from '@/components/common';
import { useLocation } from 'react-router';
import PaymentCheckContents from './components/paymentCheckContents';

function PaymentCheckPage() {
  const location = useLocation();
  const { orderItemQuantity, totalProductQuantity, orderPrice } =
    location.state;

  return (
    <>
      <Header showBackButton={true} />
      <PaymentCheckContents
        orderItemsQuantity={orderItemQuantity}
        totalProductQuantity={totalProductQuantity}
        orderPrice={orderPrice}
      />
    </>
  );
}

export default PaymentCheckPage;
