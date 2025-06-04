import { IconButton } from "../../../../components/IconButton/IconButton";
import { useCart } from "../../context/cartProvider";
import { QuantitySelectorLayout } from "./QuantitySelector.style";

interface QuantitySelectorProps {
  cartId: string;
  quantity: number;
}

export function QuantitySelector({ cartId, quantity }: QuantitySelectorProps) {
  const { patchCartItem } = useCart();

  const handleAddCount = async () => {
    await patchCartItem(cartId, quantity + 1);
  };

  const handleMinusCount = async () => {
    if (quantity < 0) return;
    if (quantity === 1 && !window.confirm("장바구니에서 삭제하시겠습니까?"))
      return;
    await patchCartItem(cartId, quantity - 1);
  };

  return (
    <div css={QuantitySelectorLayout}>
      <IconButton
        imgUrl="./react-shopping-cart/minus.png"
        onClick={handleMinusCount}
        dataTestid="quantity-minus-button"
      />
      <p data-testid="quantity-value">{quantity}</p>
      <IconButton
        imgUrl="./react-shopping-cart/plus.png"
        onClick={handleAddCount}
        dataTestid="quantity-plus-button"
      />
    </div>
  );
}
