import * as S from './OrderTitle.styles';

interface OrderTitleProps {
  quantity?: number;
  productQuantity?: number;
}

function OrderTitle({ quantity = 0, productQuantity = 0 }: OrderTitleProps) {
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Description>
        {quantity !== 0 && (
          <>
            {`총 ${quantity}종류의 상품 ${productQuantity}개를 주문합니다.`}
            <br />
            {'최종 결제 금액을 확인해 주세요.'}
          </>
        )}
      </S.Description>
    </S.Container>
  );
}

export default OrderTitle;
