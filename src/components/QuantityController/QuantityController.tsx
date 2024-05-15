import { QuantityControlButton, QuantityControllerContainer } from './QuantityController.style';

interface QuantityControllerProps {
  quantity: number;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export default function QuantityController({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  minQuantity = 1,
  maxQuantity = Infinity,
}: QuantityControllerProps) {
  return (
    <QuantityControllerContainer>
      <QuantityControlButton
        $controlType="decrease"
        $isEnabled={minQuantity < quantity}
        onClick={handleDecreaseQuantity}
      />
      {quantity}
      <QuantityControlButton
        $controlType="increase"
        $isEnabled={quantity < maxQuantity}
        onClick={handleIncreaseQuantity}
      />
    </QuantityControllerContainer>
  );
}
