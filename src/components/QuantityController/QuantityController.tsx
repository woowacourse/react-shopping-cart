import * as S from './style';

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
    <S.QuantityControllerContainer>
      <S.QuantityControlButton
        $controlType="decrease"
        $isEnabled={minQuantity < quantity}
        onClick={handleDecreaseQuantity}
      />
      {quantity}
      <S.QuantityControlButton
        $controlType="increase"
        $isEnabled={quantity < maxQuantity}
        onClick={handleIncreaseQuantity}
      />
    </S.QuantityControllerContainer>
  );
}
