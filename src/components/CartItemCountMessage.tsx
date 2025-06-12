import styled from '@emotion/styled';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const CartItemCountMessage = () => {
  const { cartItems } = useCartItemsContext();
  return <S.Message>{`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}</S.Message>;
};

export default CartItemCountMessage;

const S = {
  Message: styled.p`
    font-size: 12px;
    margin: 0 0 36px;
  `,
};
