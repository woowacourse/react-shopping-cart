// import { updateCartItem } from "../../apis/cartItem";
import { IconButton } from "../IconButton/IconButton";
import { QuantitySelectorLayout } from "./QuantitySelector.style";
// import { useShoppingContext } from "../../context/useShoppingContext";

interface QuantitySelectorProps {
  cartId: number;
  quantity: number;
  maxQuantity: number;
  onChange: () => void;
}

export function QuantitySelector({
  cartId,
  quantity,
  maxQuantity,
  onChange,
}: QuantitySelectorProps) {
  // const { dispatch } = useShoppingContext();

  const handleAddCount = async () => {
    // if (quantity === maxQuantity) {
    //   dispatch({
    //     type: "error",
    //     queryKey: "cart",
    //     payload: `재고 수량을 초과하여 담을 수 없습니다.`,
    //   });
    //   return;
    // }
    // await updateCartItem({ id: cartId, quantity: quantity + 1 });
    onChange();
  };

  const handleMinusCount = async () => {
    if (quantity < 0) return;
    // await updateCartItem({ id: cartId, quantity: quantity - 1 });
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
