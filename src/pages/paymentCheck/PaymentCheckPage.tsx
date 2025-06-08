import { Header } from '@/components/common';
import PaymentCheckContents from '@/components/features/payment/PaymentCheckContents/PaymentCheckContents';
import { useLocation } from 'react-router';

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
