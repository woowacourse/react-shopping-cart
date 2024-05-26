import * as Styled from './style';

import { useRecoilValue } from 'recoil';

import {
  shippingFeeSelector,
  totalOrderAmountSelector,
  totalPaymentAmountSelector,
} from '../../recoil/selectors';

import PaymentInfo from './PaymentInfo';
import Caption from '../Caption/Caption';
import Divider from '../Divider/Divider';

import CaptionEmoji from '../../assets/CaptionEmoji.svg';

import MESSAGE from '../../constants/Message';

const ShoppingCartTotalPaymentInfo = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

  return (
    <Styled.TotalPaymentInfo>
      <Caption>
        <img src={CaptionEmoji} />
        {MESSAGE.paymentCaption}
      </Caption>
      <Divider />
      <PaymentInfo label={MESSAGE.paymentAmount} price={totalOrderAmount} />
      <PaymentInfo label={MESSAGE.shippingFee} price={shippingFee} />
      <Divider />
      <PaymentInfo
        label={MESSAGE.totalPaymentAmount}
        price={totalPaymentAmount}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default ShoppingCartTotalPaymentInfo;
