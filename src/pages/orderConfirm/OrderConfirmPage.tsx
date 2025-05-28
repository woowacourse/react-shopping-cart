import { useLocation } from 'react-router';
import Header from '../../components/common/header/Header';
import OrderConfirmContents from './components/orderConfirmContents/OrderConfirmContents';
import Body from '../../components/common/body/Body';

function OrderConfirmPage() {
  const location = useLocation();

  console.log(location.state.orderProducts);

  return (
    <>
      <Header showBackButton={true} />
      <Body>
        <OrderConfirmContents />
      </Body>
    </>
  );
}

export default OrderConfirmPage;
