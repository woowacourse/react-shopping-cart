import Header from '../../components/common/header/Header';
import OrderConfirmContents from '../../components/features/orderConfirm/OrderConfirmContents';
import BackButton from '../../components/features/orderConfirm/backButton/BackButton';

function OrderConfirmPage() {
  return (
    <>
      <Header leftArea={<BackButton />} />
      <OrderConfirmContents />
    </>
  );
}

export default OrderConfirmPage;
