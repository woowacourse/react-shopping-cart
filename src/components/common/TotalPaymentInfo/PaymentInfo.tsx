import * as Styled from './style';

interface PaymentInfoType {
  label: string;
  price: string;
}

const PaymentInfo = ({ label, price }: PaymentInfoType) => {
  return (
    <Styled.PaymentInfo>
      <Styled.PaymentLabel>{label}</Styled.PaymentLabel>
      <Styled.PaymentPrice>{price}</Styled.PaymentPrice>
    </Styled.PaymentInfo>
  );
};

export default PaymentInfo;
