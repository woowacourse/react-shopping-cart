import * as Styled from './style';

import PaymentInfo from './PaymentInfo';
import CaptionEmoji from '../assets/CaptionEmoji.svg';

import { useRecoilValue } from 'recoil';

import {
  shippingFeeSelector,
  totalOrderAmountSelector,
  totalPaymentAmountSelector,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';

const ShoppingCartTotalPaymentInfo = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

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

export default ShoppingCartTotalPaymentInfo;
