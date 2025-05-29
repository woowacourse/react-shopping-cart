import * as Styled from "./CartQuantityControl.style";
import plusIcon from "/plus.svg";
import minusIcon from "/minus.svg";

interface ProductQuantityControlProps {
  quantity: number;
  handleIncreaseCartItemQuantity: () => void;
  handleDecreaseCartItemQuantity: () => void;
  isQuantityUpdateLoading: boolean;
}

function ProductQuantityControl({
  quantity,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
  isQuantityUpdateLoading,
}: ProductQuantityControlProps) {
  return (
    <Styled.Container>
      <Styled.Button
        onClick={handleDecreaseCartItemQuantity}
        disabled={isQuantityUpdateLoading || quantity <= 1}
      >
        <Styled.OperatorIcon src={minusIcon} />
      </Styled.Button>
      <Styled.Quantity>{quantity}</Styled.Quantity>
      <Styled.Button
        onClick={handleIncreaseCartItemQuantity}
        disabled={isQuantityUpdateLoading}
      >
        <Styled.OperatorIcon src={plusIcon} />
      </Styled.Button>
    </Styled.Container>
  );
}

export default ProductQuantityControl;
