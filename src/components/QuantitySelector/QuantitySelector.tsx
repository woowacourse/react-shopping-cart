// import { updateCartItem } from "../../apis/cartItem";
import patchShoppingCart from "../../api/patchShoppingCart";
import { IconButton } from "../IconButton/IconButton";
import { QuantitySelectorLayout } from "./QuantitySelector.style";
// import { useShoppingContext } from "../../context/useShoppingContext";

interface QuantitySelectorProps {
  cartId: number;
  quantity: number;
  onChange: () => void;
}

export function QuantitySelector({
  cartId,
  quantity,
  onChange,
}: QuantitySelectorProps) {
  const handleAddCount = async () => {
    await patchShoppingCart(cartId, quantity + 1);
    onChange();
  };

  const handleMinusCount = async () => {
    if (quantity < 0) return;
    if (quantity === 1 && !window.confirm("장바구니에서 삭제하시겠습니까?"))
      return;
    await patchShoppingCart(cartId, quantity - 1);

    onChange();
  };

  return (
    <div css={QuantitySelectorLayout}>
      <IconButton
        imgUrl="./minus.png"
        onClick={handleMinusCount}
        dataTestid="quantity-minus-button"
      />
      <p data-testid="quantity-value">{quantity}</p>
      <IconButton
        imgUrl="./plus.png"
        onClick={handleAddCount}
        dataTestid="quantity-plus-button"
      />
    </div>
  );
}
