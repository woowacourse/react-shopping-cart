import { useRecoilValue } from 'recoil';
import {
  selectedCartItemsCountSelector,
  totalCartItemQuantitySelector,
} from '../../recoil/selectors';

import Caption from '../Caption/Caption';
import Title from '../Title/Title';
import TitleContainer from './TitleContainer';

import MESSAGE from '../../constants/Message';

const OrderConfirmationTitleContainer = () => {
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountSelector);
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantitySelector);

  return (
    <TitleContainer>
      <Title>{MESSAGE.orderConfirmation}</Title>
      <Caption>
        {MESSAGE.orderSuccess(selectedCartItemsCount, totalCartItemQuantity)}
        <br />
        {MESSAGE.paymentAmountConfirmation}
      </Caption>
    </TitleContainer>
  );
};

export default OrderConfirmationTitleContainer;
