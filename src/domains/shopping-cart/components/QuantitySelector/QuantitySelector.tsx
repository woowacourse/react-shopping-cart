import { IconButton } from "../../../../components/IconButton/IconButton";
import { usePatchCartItem } from "../../hooks/shoppingCart/usePatchCartItem";
import { QuantitySelectorLayout } from "./QuantitySelector.style";

interface QuantitySelectorProps {
  cartId: string;
  quantity: number;
  refetchCartItems: (response: Response) => Promise<void>;
}

export function QuantitySelector({
  cartId,
  quantity,
  refetchCartItems,
}: QuantitySelectorProps) {
  const { patchCartItem } = usePatchCartItem();

  const handleAddCount = async () => {
    const response = await patchCartItem(cartId, quantity + 1);
    if (!response) return;
    await refetchCartItems(response);
  };

  const handleMinusCount = async () => {
    if (quantity < 0) return;
    if (quantity === 1 && !window.confirm("장바구니에서 삭제하시겠습니까?"))
      return;
    const response = await patchCartItem(cartId, quantity - 1);
    if (!response) return;
    await refetchCartItems(response);
  };

  return (
    <div css={QuantitySelectorLayout}>
      <IconButton
        imgUrl="/react-shopping-cart/minus.png"
        onClick={handleMinusCount}
        dataTestid="quantity-minus-button"
      />
      <p data-testid="quantity-value">{quantity}</p>
      <IconButton
        imgUrl="/react-shopping-cart/plus.png"
        onClick={handleAddCount}
        dataTestid="quantity-plus-button"
      />
    </div>
  );
}
