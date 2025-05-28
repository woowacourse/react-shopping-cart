import { useLocation } from 'react-router';
import Header from '../../components/common/header/Header';

function OrderConfirmPage() {
  const location = useLocation();

  console.log(location.state.orderProducts);

  return (
    <>
      <Header showBackButton={true} />
      <div>주문 확인 페이지</div>
    </>
  );
}

export default OrderConfirmPage;
