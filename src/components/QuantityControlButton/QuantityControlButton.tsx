import useQuantityControl from "../../hooks/useQuantityControl";
import { Button, Container, Text } from "./QuantityControlButton.styles";

interface QuantityControlButtonProps {
  initialQuantity: number;
  cartId: number;
}

function QuantityControlButton({
  initialQuantity,
  cartId,
}: QuantityControlButtonProps) {
  const { quantity, increaseQuantity, decreaseQuantity } = useQuantityControl({
    initialQuantity,
  });

  return (
    <div css={Container}>
      <button css={Button} onClick={() => decreaseQuantity(cartId)}>
        -
      </button>
      <p css={Text}>{quantity}</p>
      <button css={Button} onClick={() => increaseQuantity(cartId)}>
        +
      </button>
    </div>
  );
}

export default QuantityControlButton;
