import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type UserShoppingCartBadgeProps = {
  username?: string;
  quantity: number;
};

function UserShoppingCartBadge({ username, quantity }: UserShoppingCartBadgeProps) {
  return (
    <S.Container>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.Quantity isEmpty={quantity === 0}>
        {quantity > SHOPPING_QUANTITY.MAX ? `${SHOPPING_QUANTITY.MAX}+` : quantity}
      </S.Quantity>
    </S.Container>
  );
}

export default UserShoppingCartBadge;
