import * as S from './style';

function EstimatedAmountPart() {
  return (
    <S.EstimatedAmountPartContainer>
      <S.EstimatedAmountTitle>결제 예상 금액</S.EstimatedAmountTitle>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 상품금액</S.EstimatedAmountText>
        <S.EstimatedAmountText>0,000원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 배송비</S.EstimatedAmountText>
        <S.EstimatedAmountText>0,000원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.EstimatedAmountTextLine>
        <S.EstimatedAmountText>총 주문금액</S.EstimatedAmountText>
        <S.EstimatedAmountText>0,000원</S.EstimatedAmountText>
      </S.EstimatedAmountTextLine>
      <S.PurchaseButton>주문하기</S.PurchaseButton>
    </S.EstimatedAmountPartContainer>
  );
}

export default EstimatedAmountPart;
