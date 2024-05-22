import * as S from './styled';

const OrderConfirmationInfo = ({ orderInfo }) => {
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Description>{`총 ${orderInfo?.kindCount} 종류의 상품 ${orderInfo?.productCount}개를 주문합니다.`}</S.Description>
      <S.Description>최종 결제 금액을 확인해 주세요.</S.Description>
    </S.Container>
  );
};

export default OrderConfirmationInfo;
