import { useNavigate } from 'react-router';

import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type CartBadgeProps = {
  username?: string;
  cartItemsAmount: string;
};

function CartBadge({ username, cartItemsAmount }: CartBadgeProps) {
  const navigate = useNavigate();

  const moveCartList = () => navigate('/cart-list');

  return (
    <S.Container onClick={moveCartList}>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.CartItemsAmount isEmpty={cartItemsAmount === String(SHOPPING_QUANTITY.MIN)}>
        {cartItemsAmount}
      </S.CartItemsAmount>
    </S.Container>
  );
}

export default CartBadge;
