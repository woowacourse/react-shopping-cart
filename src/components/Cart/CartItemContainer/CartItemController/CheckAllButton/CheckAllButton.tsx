/** @jsxImportSource @emotion/react */

import { useRecoilState } from "recoil";
import { CheckAllButtonStyle } from "./CheckAllButton.style";
import { checkAllItemSelector } from "../../../../../store/selector/selectors";
import Checkbox from "../../../../common/Buttons/Checkbox/Checkbox";

const CheckAllButton = () => {
  const [state, setState] = useRecoilState(checkAllItemSelector);

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
