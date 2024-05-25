import * as Styled from './style';

import PaymentInfo from './PaymentInfo';
import CaptionEmoji from '../../assets/CaptionEmoji.svg';
import Caption from '../Caption/Caption';

import { useRecoilValue } from 'recoil';
import {
  finalShippingFeeSelector,
  finalTotalPaymentAmountSelector,
  totalOrderAmountSelector,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';

const OrderConfirmationTotalPaymentInfo = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(finalShippingFeeSelector);
  const totalPaymentAmount = useRecoilValue(finalTotalPaymentAmountSelector);

  return (
    <Styled.TotalPaymentInfo>
      <Caption>
        <img src={CaptionEmoji} />
        {MESSAGE.paymentCaption}
      </Caption>
      <Styled.Divider />
      <PaymentInfo label={MESSAGE.paymentAmount} price={totalOrderAmount} />
      <PaymentInfo label={MESSAGE.couponDiscountAmount} price={-6000} />
      <PaymentInfo label={MESSAGE.shippingFee} price={shippingFee} />
      <Styled.Divider />
      <PaymentInfo
        label={MESSAGE.totalPaymentAmount}
        price={totalPaymentAmount}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default OrderConfirmationTotalPaymentInfo;
