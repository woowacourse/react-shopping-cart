import * as Styled from './style';

import { useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import {
  cartItemsCountState,
  isSomeCartItemSelectedState,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';

interface OrderButtonProp {
  onClick: () => void;
}

const OrderButton = ({ onClick }: OrderButtonProp) => {
  const cartItemsCount = useRecoilValue(cartItemsCountState);
  const isSomeCartItemSelected = useRecoilValue(isSomeCartItemSelectedState);

  const hasSomeCartItem = !!cartItemsCount;
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  const location = useLocation();

  const label = () => {
    switch (location.pathname) {
      case '/':
        return MESSAGE.orderConfirmation;
      case '/orderConfirmation':
        return MESSAGE.pay;
      default:
        return '';
    }
  };

  return (
    <Styled.OrderButton
      onClick={() => onClick()}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {label()}
    </Styled.OrderButton>
  );
};

export default OrderButton;
