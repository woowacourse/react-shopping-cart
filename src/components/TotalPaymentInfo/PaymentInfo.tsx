import * as Styled from './style';

import MESSAGE from '../../constants/Message';

interface PaymentInfoType {
  label: string;
  price: number;
  isDiscount?: boolean;
}

const PaymentInfo = ({ label, price, isDiscount = false }: PaymentInfoType) => {
  return (
    <Styled.PaymentInfo>
      <Styled.PaymentLabel>{label}</Styled.PaymentLabel>
      <Styled.PaymentPrice>
        {isDiscount && price > 0 && '-'}
        {price.toLocaleString('ko-kr')}
        {MESSAGE.koreanCurrencyUnit}
      </Styled.PaymentPrice>
    </Styled.PaymentInfo>
  );
};

export default PaymentInfo;
