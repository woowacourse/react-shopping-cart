import * as S from './style';

type UserSummaryShoppingBasketProps = {
  username?: string;
  quantity: number;
};

function UserSummaryShoppingBasket({ username, quantity }: UserSummaryShoppingBasketProps) {
  return (
    <S.Container>
      <S.Username>{username && `${username}의 `}장바구니</S.Username>
      <S.Quantity>{quantity > 99 ? '99' : quantity}</S.Quantity>
      {quantity > 99 && <S.PlusIcon aria-label="99개 이상입니다.">+</S.PlusIcon>}
    </S.Container>
  );
}

export default UserSummaryShoppingBasket;
