import * as S from "./CartItemQuantityButton.styled";
import PlusIcon from "@assets/icons/plus.svg";
import MinusIcon from "@assets/icons/minus.svg";
import RemoveCartItemButton from "../Remove/RemoveCartItemButton";

type CartItemQuantityButtonProps = {
  id: number;
  quantity: number;
  updateCartItem: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

function CartItemQuantityButton({
  id,
  quantity,
  updateCartItem,
  removeCartItem,
}: CartItemQuantityButtonProps) {
  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton id={id} removeCartItem={removeCartItem} />
      ) : (
        <S.Button
          type="button"
          onClick={() => updateCartItem(id, quantity - 1)}
        >
          <img src={MinusIcon} alt="수량 1개 빼기" />
        </S.Button>
      )}
      <S.QuantityText data-testid="current-cart-item-quantity">
        {quantity}
      </S.QuantityText>
      <S.Button type="button" onClick={() => updateCartItem(id, quantity + 1)}>
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
