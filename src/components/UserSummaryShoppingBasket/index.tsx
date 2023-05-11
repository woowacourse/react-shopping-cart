import { SHOPPING_QUANTITY } from '@Constants/index';
import * as S from './style';

type UserSummaryShoppingBasketProps = {
  username?: string;
  quantity: number;
};

function UserSummaryShoppingBasket({ username, quantity }: UserSummaryShoppingBasketProps) {
  return (
    <S.Container>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.Quantity>{quantity > SHOPPING_QUANTITY.MAX ? `${SHOPPING_QUANTITY.MAX}` : quantity}</S.Quantity>
      {quantity > SHOPPING_QUANTITY.MAX && (
        <S.PlusIcon aria-label={`${SHOPPING_QUANTITY.MAX}개 이상입니다.`}>+</S.PlusIcon>
      )}
    </S.Container>
  );
}

export default UserSummaryShoppingBasket;
