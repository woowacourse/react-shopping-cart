import * as Styled from "./CartQuantityControl.style";
import plusIcon from "/plus.svg";
import minusIcon from "/minus.svg";

function ProductQuantityControl({
  quantity,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: {
  quantity: number;
  handleIncreaseCartItemQuantity: () => void;
  handleDecreaseCartItemQuantity: () => void;
}) {
  return (
    <Styled.Container>
      <Styled.Button onClick={handleDecreaseCartItemQuantity}>
        <Styled.OperatorIcon src={minusIcon} />
      </Styled.Button>
      <Styled.Quantity>{quantity}</Styled.Quantity>
      <Styled.Button onClick={handleIncreaseCartItemQuantity}>
        <Styled.OperatorIcon src={plusIcon} />
      </Styled.Button>
    </Styled.Container>
  );
}

export default ProductQuantityControl;
