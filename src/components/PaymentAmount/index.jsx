import * as S from "./index.styles";

const PaymentAmount = () => {
  return (
    <S.PaymentAmountContainer>
      <S.PaymentAmountTitle>결제예상금액</S.PaymentAmountTitle>
      <S.PaymentAmountControlContainer>
        <S.PaymentAmountInfoContainer>
          <p>결제예상금액</p>
          <p>원</p>
        </S.PaymentAmountInfoContainer>
        <S.OrderButton type="button">주문하기(개)</S.OrderButton>
      </S.PaymentAmountControlContainer>
    </S.PaymentAmountContainer>
  );
};

export default PaymentAmount;
