import styled from '@emotion/styled';
import { useCartItemsContext } from '../../contexts/CartItems/CartItemsContext';
import { useCheckCartIdsContext } from '../../contexts/CheckedCartIds/CheckedCartIdsContext';

const CartItemConfirmMessage = () => {
  const { cartItems } = useCartItemsContext();
  const { checkedCartIds } = useCheckCartIdsContext();
  const selectedCartItems = cartItems.filter((item) =>
    checkedCartIds.includes(item.id)
  );

  const totalCount = selectedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <S.message>
      {`총 ${checkedCartIds.length}종류의 상품 ${totalCount}개를 주문합니다`}
      <br />
      최종 결제 금액을 확인해 주세요.
    </S.message>
  );
};

export default CartItemConfirmMessage;

const S = {
  message: styled.p`
    font-size: 12px;
    margin: 0 0 36px;
    line-height: 1.6;
  `,
};
