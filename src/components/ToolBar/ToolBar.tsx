import { PropsWithChildren } from "react";

import Checkbox from "@/components/Button/Checkbox/Checkbox";
import { ControlStyle } from "./ToolBar.style";

interface Toolbar extends PropsWithChildren {
  handleCheck: () => void;
  isCheck: boolean;
}

const ToolBar = ({ handleCheck, isCheck, children }: Toolbar) => {
  return (
    <div css={ControlStyle}>
      <Checkbox isCheck={isCheck} onClick={handleCheck} />
      <div>{children}</div>
    </div>
  );
};

export default ToolBar;
