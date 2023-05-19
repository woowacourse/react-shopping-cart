import { useRecoilValue } from 'recoil';

import estimatedAmountState from '@Selector/estimatedAmountState';

import * as S from './style';

function EstimatedAmountPart() {
  const estimatedAmount = useRecoilValue(estimatedAmountState);
  const estimatedAmountText = estimatedAmount.toLocaleString();
  const totalEstimatedAmountText = (estimatedAmount + 3000).toLocaleString();

  return (
    <S.EstimatedAmountPartContainer>
      <S.EstimatedAmountTitle>결제 예상 금액</S.EstimatedAmountTitle>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 상품금액</S.EstimatedAmountText>
        <S.EstimatedAmountText>{estimatedAmountText}원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 배송비</S.EstimatedAmountText>
        <S.EstimatedAmountText>3,000원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 주문금액</S.EstimatedAmountText>
        <S.EstimatedAmountText>{totalEstimatedAmountText}원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.PurchaseButton>주문하기</S.PurchaseButton>
    </S.EstimatedAmountPartContainer>
  );
}

export default EstimatedAmountPart;
