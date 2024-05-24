import { PropsWithChildren } from "react";

import Checkbox from "@/components/Button/Checkbox/Checkbox";
import { ControlStyle } from "./ToolBar.style";

interface Toolbar extends PropsWithChildren {
  handleCheck: () => void;
  isCheck: boolean;
  isDisabled?: boolean;
}

const ToolBar = ({ handleCheck, isCheck, isDisabled = false, children }: Toolbar) => {
  return (
    <div css={ControlStyle(isDisabled)}>
      <Checkbox isCheck={isCheck} onClick={handleCheck} isDisabled={isDisabled} />
      <div>{children}</div>
    </div>
  );
};

export default ToolBar;
