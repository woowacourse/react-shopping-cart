import * as S from './CartItemQuantityButton.styled';
import PlusIcon from '@assets/icons/plus.svg';
import MinusIcon from '@assets/icons/minus.svg';
import RemoveCartItemButton from '../Remove/RemoveCartItemButton';

type CartItemQuantityButtonProps = {
  cartItemId: number;
  quantity: number;
}
function CartItemQuantityButton({ cartItemId, quantity }: CartItemQuantityButtonProps) {
};
  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton cartItemId={cartItemId} />
      ) : (
        <S.Button type="button" onClick={() => {}}>
          <img src={MinusIcon} alt="수량 1개 빼기" />
        </S.Button>
      )}
      <S.QuantityText data-testid="current-cart-item-quantity">{quantity}</S.QuantityText>
      <S.Button type="button" onClick={() => {}}>
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
