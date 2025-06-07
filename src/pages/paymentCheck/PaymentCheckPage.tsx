import { Header } from '@/components/common';
import { useLocation } from 'react-router';
import PaymentCheckContents from './components/paymentCheckContents';

function PaymentCheckPage() {
  const location = useLocation();
  const { orderItemQuantity, totalProductQuantity, paymentPrice } =
    location.state;

  return (
    <>
      <Header />
      <PaymentCheckContents
        orderItemsQuantity={orderItemQuantity}
        totalProductQuantity={totalProductQuantity}
        paymentPrice={paymentPrice}
      />
    </>
  );
}

export default PaymentCheckPage;
