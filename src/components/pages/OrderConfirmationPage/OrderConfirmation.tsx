import { Suspense } from 'react';
import Header from '../../common/Header/Header';
import * as Styled from './style';
import OrderConfirmationContainer from '../../OrderConfirmationContainer/OrderConfirmationContainer';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <Styled.OrderConfirmation>
      <Header onClick={() => navigate(-1)} />
      <Suspense>
        <OrderConfirmationContainer />
      </Suspense>
    </Styled.OrderConfirmation>
  );
};

export default OrderConfirmation;
