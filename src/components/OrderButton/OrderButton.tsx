import * as Styled from './style';

import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import {
  cartItemsCountSelector,
  isSomeCartItemSelectedSelector,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';
import CONDITION from '../../constants/Condition';

const OrderButton = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);
  const isSomeCartItemSelected = useRecoilValue(isSomeCartItemSelectedSelector);

  const hasSomeCartItem = !!cartItemsCount;
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  const location = useLocation();
  const navigator = useNavigate();

  const label = () => {
    switch (location.pathname) {
      case CONDITION.shoppingCartPage:
        return MESSAGE.orderConfirmation;
      case CONDITION.orderConfirmationPage:
        return MESSAGE.pay;
      case CONDITION.paymentConfirmationPage:
        return MESSAGE.returningToShoppingCart;
      default:
        return '';
    }
  };

  const navigatorPath = () => {
    switch (location.pathname) {
      case CONDITION.shoppingCartPage:
        return CONDITION.orderConfirmationPage;
      case CONDITION.orderConfirmationPage:
        return CONDITION.paymentConfirmationPage;
      case CONDITION.paymentConfirmationPage:
        return CONDITION.shoppingCartPage;
      default:
        return CONDITION.shoppingCartPage;
    }
  };

  return (
    <Styled.OrderButton
      onClick={() => navigator(navigatorPath())}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {label()}
    </Styled.OrderButton>
  );
};

export default OrderButton;
