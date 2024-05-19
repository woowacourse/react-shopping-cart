/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import Checkbox from "../../../../Button/Checkbox/Checkbox";
import { ControlStyle } from "./CartItemControls.style";
import { checkAllItemState } from "../../../../../store/selector/selectors";

const CartItemControls = () => {
  const [state, setState] = useRecoilState(checkAllItemState);

  const handleClick = () => {
    setState((prev) => {
      return !prev;
    });
  };

  return (
    <div css={ControlStyle}>
      <Checkbox isCheck={state} onClick={handleClick} />
      <div>전체 선택</div>
    </div>
  );
};

export default CartItemControls;
