import { Wrapper } from "./style";
import { ReactNode } from "react";

interface LargeTextProps {
  children: ReactNode;
}

const LargeText = ({ children }: LargeTextProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default LargeText;
