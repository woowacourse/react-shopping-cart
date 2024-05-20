import MESSAGE from '../../constants/Message';
import * as Styled from './style';

interface PaymentInfoType {
  label: string;
  price: number;
}

const PaymentInfo = ({ label, price }: PaymentInfoType) => {
  return (
    <Styled.PaymentInfo>
      <Styled.PaymentLabel>{label}</Styled.PaymentLabel>
      <Styled.PaymentPrice>
        {price.toLocaleString('ko-kr')}
        {MESSAGE.koreanCurrencyUnit}
      </Styled.PaymentPrice>
    </Styled.PaymentInfo>
  );
};

export default PaymentInfo;
