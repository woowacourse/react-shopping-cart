import { ReactNode } from "react";
import { Wrapper } from "./style";

interface MediumTextProps {
  children: ReactNode;
  color?: "black" | "white";
}

const MediumText = ({ children }: MediumTextProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MediumText;
