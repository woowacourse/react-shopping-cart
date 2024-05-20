import PaymentInfo from './PaymentInfo';
import * as Styled from './style';
import CaptionEmoji from '../assets/CaptionEmoji.svg';
import { useRecoilValue } from 'recoil';
import { cartItemsCalculatorState } from '../../recoil/cartItems';
import MESSAGE from '../../constants/Message';

const TotalPaymentInfo = () => {
  const { totalOrderAmount, shippingFee, totalPaymentAmount } = useRecoilValue(
    cartItemsCalculatorState,
  );

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
