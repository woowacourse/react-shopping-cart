import PaymentInfo from './PaymentInfo';
import * as Styled from './style';
import CaptionEmoji from '../assets/CaptionEmoji.svg';
import { useRecoilValue } from 'recoil';
import { CartItemsCalculatorSelector } from '../../recoil/cartItems';

const TotalPaymentInfo = () => {
  const koMoneyFormat = (money: number) => `${money.toLocaleString('ko-kr')}원`;
  const { totalOrderAmount, shippingFee, totalPaymentAmount } = useRecoilValue(
    CartItemsCalculatorSelector,
  );

  return (
    <Styled.TotalPaymentInfo>
      <Styled.PaymentCaption>
        <img src={CaptionEmoji} />총 주문 금액이 100,000원 이상일 경우 무료
        배송됩니다.
      </Styled.PaymentCaption>
      <Styled.Divider />
      <PaymentInfo label="주문 금액" price={koMoneyFormat(totalOrderAmount)} />
      <PaymentInfo label="배송비" price={koMoneyFormat(shippingFee)} />
      <Styled.Divider />
      <PaymentInfo
        label="총 결제 금액"
        price={koMoneyFormat(totalPaymentAmount)}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default TotalPaymentInfo;
