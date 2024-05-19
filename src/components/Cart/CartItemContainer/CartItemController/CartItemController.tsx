/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { ControllerStyle } from "./CartItemController.style";
import { checkAllItemState } from "../../../../store/selector/selectors";
import Checkbox from "../../../Button/Checkbox/Checkbox";

const CartItemController = () => {
  const [state, setState] = useRecoilState(checkAllItemState);

  const handleClick = () => {
    setState((prev) => {
      return !prev;
    });
  };

  return (
    <div css={ControllerStyle}>
      <Checkbox isCheck={state} onClick={handleClick} />
      <div>전체 선택</div>
    </div>
  );
};

export default CartItemController;
