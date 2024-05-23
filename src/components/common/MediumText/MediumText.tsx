import { ReactNode } from "react";
import { Wrapper } from "./style";

interface MediumTextProps {
  children: ReactNode;
  color?: "black" | "white";
}

const MediumText = ({ children, color = "black" }: MediumTextProps) => {
  return <Wrapper color={color}>{children}</Wrapper>;
};

export default MediumText;
