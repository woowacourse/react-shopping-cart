import { PropsWithChildren } from "react";

import Checkbox from "@/components/Button/Checkbox/Checkbox";
import { ControlStyle } from "./ToolBar.style";

interface Toolbar extends PropsWithChildren {
  handleCheck: () => void;
  isCheck: boolean;
  disabled?: boolean;
}

const ToolBar = ({ handleCheck, isCheck, disabled = false, children }: Toolbar) => {
  return (
    <div css={ControlStyle(disabled)}>
      <Checkbox isCheck={isCheck} onClick={handleCheck} disabled={disabled} />
      <div>{children}</div>
    </div>
  );
};

export default ToolBar;
