import { Button, Container, Text } from "./QuantityControlButton.styles";

function QuantityControlButton() {
  return (
    <div css={Container}>
      <button css={Button}>-</button>
      <p css={Text}>{3}</p>
      <button css={Button}>+</button>
    </div>
  );
}

export default QuantityControlButton;
