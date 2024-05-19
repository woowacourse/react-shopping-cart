/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import Checkbox from "@/components/Button/Checkbox/Checkbox";
import { ControlStyle } from "./CartItemsToolBar.style";
import { checkAllItemState } from "@/store/atom/atoms";

const CartItemsToolBar = () => {
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

export default CartItemsToolBar;
