/** @jsxImportSource @emotion/react */

import { useRecoilState } from "recoil";
import Checkbox from "../../../../Button/Checkbox/Checkbox";
import { CheckAllButtonStyle } from "./CheckAllButton.style";
import { checkAllItemState } from "../../../../../store/selector/selectors";

const CheckAllButton = () => {
  const [state, setState] = useRecoilState(checkAllItemState);

  const handleClick = () => {
    setState((prev) => {
      return !prev;
    });
  };
  return (
    <div css={CheckAllButtonStyle}>
      <Checkbox isCheck={state} onClick={handleClick} />
      <div>전체 선택</div>
    </div>
  );
};

export default CheckAllButton;
