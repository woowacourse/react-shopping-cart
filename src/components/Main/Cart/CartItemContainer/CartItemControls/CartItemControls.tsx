/** @jsxImportSource @emotion/react */
import Checkbox from "../../../../Button/Checkbox/Checkbox";
import { ControlStyle } from "./CartItemControls.style";

const CartItemControls = () => {
  return (
    <div css={ControlStyle}>
      <Checkbox />

      <div>전체 선택</div>
    </div>
  );
};

export default CartItemControls;
