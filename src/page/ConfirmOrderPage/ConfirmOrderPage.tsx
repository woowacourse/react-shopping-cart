import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  NavigationBar,
  PreviousPageButton,
  FooterButton,
  PageTitle,
} from '../../components/common';
import * as Styled from './ConfirmOrderPage.style';

import { ENDPOINT } from '../../routes/router.constants';
import { OrderContainer } from '../../components/confirmOrder';

export default function ConfirmOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.isFromCartPage) {
      navigate(ENDPOINT.shoppingCart);
    }
  }, [location.state, navigate]);

  const handleClickPreviousPageButton = () => {
    navigate(ENDPOINT.shoppingCart);
  };

  return (
    <>
      <NavigationBar>
        <PreviousPageButton onClick={handleClickPreviousPageButton} />
      </NavigationBar>

      <Styled.OrderContent>
        <PageTitle title="주문 확인" />
        <OrderContainer />
      </Styled.OrderContent>

      <FooterButton type="button" buttonText="결제하기" disabled />
    </>
  );
}
