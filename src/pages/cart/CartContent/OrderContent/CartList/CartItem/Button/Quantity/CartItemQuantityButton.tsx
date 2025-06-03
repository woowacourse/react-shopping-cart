import * as S from "./CartItemQuantityButton.styled";
import PlusIcon from "@assets/icons/plus.svg";
import MinusIcon from "@assets/icons/minus.svg";
import RemoveCartItemButton from "../Remove/RemoveCartItemButton";

type CartItemQuantityButtonProps = {
  id: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

function CartItemQuantityButton({
  id,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemQuantityButtonProps) {
  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton id={id} onClick={onRemove} />
      ) : (
        <S.Button
          type="button"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
        >
          <img src={MinusIcon} alt="수량 1개 빼기" />
        </S.Button>
      )}
      <S.QuantityText data-testid="current-cart-item-quantity">
        {quantity}
      </S.QuantityText>
      <S.Button
        type="button"
        onClick={() => onUpdateQuantity(id, quantity + 1)}
      >
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
