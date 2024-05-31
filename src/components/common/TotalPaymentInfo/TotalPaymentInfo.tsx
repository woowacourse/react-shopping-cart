import PaymentInfo from './PaymentInfo';
import * as Styled from './style';
import { useRecoilValue } from 'recoil';
import {
  shippingFeeSelector,
  totalOrderAmountSelector,
  totalPaymentAmountSelector,
} from '../../../recoil/cartItems';
import { ReactNode } from 'react';
import Caption from '../Caption/Caption';
import { koMoneyFormat } from '../../../util/common/koMoneyFormat';

interface TotalPaymentInfoProp {
  children?: ReactNode;
}

const TotalPaymentInfo = ({ children }: TotalPaymentInfoProp) => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

  return (
    <Styled.TotalPaymentInfo>
      <Caption
        message="총 주문 금액이 100,000원 이상일 경우 무료
      배송됩니다."
      />
      <Styled.TotalDivider />
      <PaymentInfo label="주문 금액" price={koMoneyFormat(totalOrderAmount)} />
      {children}
      <PaymentInfo label="배송비" price={koMoneyFormat(shippingFee)} />
      <Styled.TotalDivider />
      <PaymentInfo
        label="총 결제 금액"
        price={koMoneyFormat(totalPaymentAmount)}
      />
    </Styled.TotalPaymentInfo>
  );
};

export default TotalPaymentInfo;
