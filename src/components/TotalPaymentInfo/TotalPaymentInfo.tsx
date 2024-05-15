import PaymentInfo from './PaymentInfo';
import * as Styled from './style';
import CaptionEmoji from '../assets/CaptionEmoji.svg';

const TotalPaymentInfo = () => {
  const koMoneyFormat = (money: number) => `${money.toLocaleString('ko-kr')}원`;

  return (
    <Styled.TotalPaymentInfo>
      <Styled.PaymentCaption>
        <img src={CaptionEmoji} />총 주문 금액이 100,000원 이상일 경우 무료
        배송됩니다.
      </Styled.PaymentCaption>
      <Styled.Divider />
      <PaymentInfo label="주문 금액" price={koMoneyFormat(70000)} />
      <PaymentInfo label="배송비" price={koMoneyFormat(3000)} />
      <Styled.Divider />
      <PaymentInfo label="총 결제 금액" price={koMoneyFormat(73000)} />
    </Styled.TotalPaymentInfo>
  );
};

export default TotalPaymentInfo;
