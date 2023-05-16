import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type UserSummaryShoppingCartProps = {
  username?: string;
  quantity: number;
};

function UserSummaryShoppingCart({ username, quantity }: UserSummaryShoppingCartProps) {
  const quantityText = quantity > SHOPPING_QUANTITY.MAX ? `${SHOPPING_QUANTITY.MAX}+` : quantity;

  return (
    <S.Container>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.Quantity>{quantityText}</S.Quantity>
    </S.Container>
  );
}

export default UserSummaryShoppingCart;
