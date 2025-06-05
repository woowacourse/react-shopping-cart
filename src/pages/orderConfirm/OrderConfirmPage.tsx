import Header from '../../components/common/header/Header';
import BackButton from '../../components/features/orderConfirm/backButton/BackButton';
import OrderContents from '../../components/features/orderConfirm/orderContents/OrderContents';

function OrderConfirmPage() {
  return (
    <>
      <Header leftArea={<BackButton />} />
      <OrderContents />
    </>
  );
}

export default OrderConfirmPage;
