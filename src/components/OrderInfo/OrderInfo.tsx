import * as S from './styled';

const OrderInfo = () => {
  const money = 120000;
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.ConfirmMessage>{`총 2종류의 상품 4개를 주문합니다.
최종 결제 금액을 확인해 주세요.`}</S.ConfirmMessage>
      <S.PriceInfo>
        <S.PriceInfoTitle>총 결제 금액</S.PriceInfoTitle>
        <S.Price>{money.toLocaleString()}원</S.Price>
      </S.PriceInfo>
    </S.Container>
  );
};

export default OrderInfo;
