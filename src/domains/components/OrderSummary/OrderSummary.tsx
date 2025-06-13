import * as S from "./OrderSummary.styled";

type OrderSummaryProps = {
  title: string;
  orderListCount: number;
  orderQuantity: number;
};

export default function OrderSummary({
  title,
  orderListCount,
  orderQuantity,
}: OrderSummaryProps) {
  return (
    <>
      <S.Title>{title}</S.Title>
      <S.Text>
        총 {orderListCount}종류의 상품 {orderQuantity}개를 주문합니다. 최종 결제
        금액을 확인해 주세요.
      </S.Text>
    </>
  );
}
