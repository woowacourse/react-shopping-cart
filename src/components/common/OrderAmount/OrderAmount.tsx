import { useRecoilValue } from 'recoil';
import { discountAmountState } from '../../../recoil/atoms';
import { shippingCostState, orderAmountState, totalAmountState } from '../../../recoil/selectors';

import { InfoBox } from '../';
import { convertToLocaleAmount } from '../../../utils';
import * as Styled from './OrderAmount.styled';

interface OrderAmountProps {
  pageRoute: 'shoppingCart' | 'confirmOrder';
}

export default function OrderAmount({ pageRoute }: OrderAmountProps) {
  const orderAmount = useRecoilValue(orderAmountState);
  const shippingCost = useRecoilValue(shippingCostState);
  const totalAmount = useRecoilValue(totalAmountState);
  const discountAmount = useRecoilValue(discountAmountState);

  return (
    <div>
      <InfoBox
        alt="무료 배송 기준 메시지 아이콘"
        text="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다."
      />

      <Styled.OrderAmountContainer>
        <Styled.AmountItem>
          <Styled.Title>주문 금액</Styled.Title>
          <Styled.Amount>{convertToLocaleAmount(orderAmount)}</Styled.Amount>
        </Styled.AmountItem>

        {pageRoute === 'confirmOrder' && (
          <Styled.AmountItem>
            <Styled.Title>쿠폰 할인 금액</Styled.Title>
            <Styled.Amount>{convertToLocaleAmount(0 - discountAmount)}</Styled.Amount>
          </Styled.AmountItem>
        )}

        <Styled.AmountItem>
          <Styled.Title>배송비</Styled.Title>
          <Styled.Amount>{convertToLocaleAmount(shippingCost)}</Styled.Amount>
        </Styled.AmountItem>
      </Styled.OrderAmountContainer>

      <Styled.AmountItem>
        <Styled.Title>총 결제 금액</Styled.Title>
        <Styled.Amount>{convertToLocaleAmount(totalAmount)}</Styled.Amount>
      </Styled.AmountItem>
    </div>
  );
}
