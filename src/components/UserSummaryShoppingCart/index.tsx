import { useNavigate } from 'react-router';

import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type UserShoppingCartBadgeProps = {
  username?: string;
  shoppingCartAmount: string;
};

function UserShoppingCartBadge({ username, shoppingCartAmount }: UserShoppingCartBadgeProps) {
  const navigate = useNavigate();

  const moveShoppingList = () => navigate('/shopping-list');

  return (
    <S.Container onClick={moveShoppingList}>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.ShoppingCartAmount isEmpty={shoppingCartAmount === String(SHOPPING_QUANTITY.MIN)}>
        {shoppingCartAmount}
      </S.ShoppingCartAmount>
    </S.Container>
  );
}

export default UserShoppingCartBadge;
