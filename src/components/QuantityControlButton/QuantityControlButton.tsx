import { Button, Container, Text } from "./QuantityControlButton.styles";

interface QuantityControlButtonProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

function QuantityControlButton({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: QuantityControlButtonProps) {
  return (
    <div css={Container}>
      <button css={Button} onClick={decreaseQuantity}>
        -
      </button>
      <p css={Text}>{quantity}</p>
      <button css={Button} onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}

export default QuantityControlButton;
