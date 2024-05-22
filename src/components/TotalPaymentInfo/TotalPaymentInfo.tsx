import * as Styled from './style';

import PaymentInfo from './PaymentInfo';
import CaptionEmoji from '../assets/CaptionEmoji.svg';

import { useRecoilValue } from 'recoil';

import {
  shippingFeeState,
  totalOrderAmountState,
  totalPaymentAmountState,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';

const TotalPaymentInfo = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountState);
  const shippingFee = useRecoilValue(shippingFeeState);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountState);

  return (
    <Styled.TotalPaymentInfo>
      <Styled.PaymentCaptionContainer>
        <img src={CaptionEmoji} />
        <Styled.PaymentCaption>{MESSAGE.paymentCaption}</Styled.PaymentCaption>
      </Styled.PaymentCaptionContainer>
      <Styled.Divider />
      <PaymentInfo label={MESSAGE.paymentAmount} price={totalOrderAmount} />
      <PaymentInfo label={MESSAGE.shippingFee} price={shippingFee} />
      <Styled.Divider />
      <PaymentInfo
        label={MESSAGE.totalPaymentAmount}
        price={totalPaymentAmount}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default TotalPaymentInfo;
