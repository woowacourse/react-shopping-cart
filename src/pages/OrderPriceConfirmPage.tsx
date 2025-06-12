import styled from '@emotion/styled';
import BottomButton from '../components/buttons/BottomButton';
import { useCartItemsContext } from '../contexts/CartItems/CartItemsContext';
import getOrderPrice from '../utils/getOrderPrice';
import { useCheckCartIdsContext } from '../contexts/CheckedCartIds/CheckedCartIdsContext';
import calculateDeliveryPrice from '../utils/calculateDeliveryPrice';

const OrderPriceConfirmPage = () => {
  const { cartItems } = useCartItemsContext();
  const { checkedCartIds } = useCheckCartIdsContext();
  const orderPrice = getOrderPrice(cartItems, checkedCartIds);
  const deliveryPrice = calculateDeliveryPrice(orderPrice);

  const totalPrice = orderPrice + deliveryPrice;
  const totalQuantity = cartItems
    .filter(({ id }) => checkedCartIds.includes(id))
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <S.content data-testid="orderPriceConfirmPage">
        <S.title>결제 확인</S.title>
        <S.middleContainer>
          <p>
            총 {checkedCartIds.length}종류의 상품 {totalQuantity}개를
            주문했습니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </S.middleContainer>
        <S.bottomContainer>
          <S.totalPriceText>총 결제 금액</S.totalPriceText>
          <S.totalPrice>{totalPrice.toLocaleString()}원</S.totalPrice>
        </S.bottomContainer>
      </S.content>
      <BottomButton disabled title="결제하기" />
    </>
  );
};

export default OrderPriceConfirmPage;

const S = {
  content: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    height: calc(100vh - 64px - 64px);
  `,

  title: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,

  middleContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  bottomContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,

  totalPriceText: styled.p`
    font-size: 16px;
    font-weight: 700;
  `,

  totalPrice: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,
};
