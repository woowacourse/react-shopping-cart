import { ReactNode, useRef, useEffect, RefObject, MouseEvent } from "react";
import { Wrapper, DiaglogContent } from "./style";

interface DialogProps {
  children?: ReactNode;
  dialogRef?: RefObject<HTMLDialogElement>;
}

const Dialog = ({ children, dialogRef }: DialogProps) => {
  const handleClick = (event: MouseEvent) => {
    if (event.target === dialogRef?.current) {
      dialogRef.current.close();
    }
  };

  return (
    <Wrapper ref={dialogRef} onClick={handleClick}>
      <DiaglogContent>{children}</DiaglogContent>
    </Wrapper>
  );
};

export default Dialog;
