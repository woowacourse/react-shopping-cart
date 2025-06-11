import * as S from './OrderTitle.styles';

interface OrderTitleProps {
  uniqueProductCount?: number;
  productQuantity?: number;
}

function OrderTitle({
  uniqueProductCount = 0,
  productQuantity = 0,
}: OrderTitleProps) {
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Description>
        {uniqueProductCount !== 0 && (
          <>
            {`총 ${uniqueProductCount}종류의 상품 ${productQuantity}개를 주문합니다.`}
            <br />
            {'최종 결제 금액을 확인해 주세요.'}
          </>
        )}
      </S.Description>
    </S.Container>
  );
}

export default OrderTitle;
