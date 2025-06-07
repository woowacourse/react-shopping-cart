import styled from '@emotion/styled';
import { useCartItemsContext } from '../contexts/CartItems/CartItemsContext';

const CartItemCountMessage = () => {
  const { cartItems } = useCartItemsContext();
  return (
    <S.message>{`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}</S.message>
  );
};

export default CartItemCountMessage;

const S = {
  message: styled.p`
    font-size: 12px;
    margin: 0 0 36px;
  `,
};
