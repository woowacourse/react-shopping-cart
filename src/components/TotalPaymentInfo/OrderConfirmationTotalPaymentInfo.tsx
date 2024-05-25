import * as Styled from './style';

import { useRecoilValue } from 'recoil';
import {
  couponDiscountAmountSelector,
  finalShippingFeeSelector,
  finalTotalPaymentAmountSelector,
  totalOrderAmountSelector,
} from '../../recoil/selectors';

import PaymentInfo from './PaymentInfo';
import CaptionEmoji from '../../assets/CaptionEmoji.svg';
import Caption from '../Caption/Caption';
import Divider from '../Divider/Divider';

import MESSAGE from '../../constants/Message';

const OrderConfirmationTotalPaymentInfo = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(finalShippingFeeSelector);
  const totalPaymentAmount = useRecoilValue(finalTotalPaymentAmountSelector);
  const couponDiscountAmount = useRecoilValue(couponDiscountAmountSelector);

  return (
    <Styled.TotalPaymentInfo>
      <Caption>
        <img src={CaptionEmoji} />
        {MESSAGE.paymentCaption}
      </Caption>
      <Divider />
      <PaymentInfo label={MESSAGE.paymentAmount} price={totalOrderAmount} />
      <PaymentInfo
        label={MESSAGE.couponDiscountAmount}
        price={couponDiscountAmount}
        isDiscount={true}
      />
      <PaymentInfo label={MESSAGE.shippingFee} price={shippingFee} />
      <Divider />
      <PaymentInfo
        label={MESSAGE.totalPaymentAmount}
        price={totalPaymentAmount}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default OrderConfirmationTotalPaymentInfo;
