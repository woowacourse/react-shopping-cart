import styled from '@emotion/styled';

interface OrderPageMessageProps {
  cartLength: number;
  totalQuantity: number;
}

const OrderPageMessage = ({ cartLength, totalQuantity }: OrderPageMessageProps) => {
  return (
    <S.Container>
      <S.Message>
        총 {cartLength}종류의 상품 {totalQuantity}개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </S.Message>
    </S.Container>
  );
};

export default OrderPageMessage;

const S = {
  Container: styled.div`
    margin: 0 0 10px;
  `,

  Message: styled.p`
    font-size: 12px;
    line-height: 150%;
  `,
};
