import { Wrapper } from "./style";
import { ReactNode } from "react";

interface SmallTextProps {
  children: ReactNode;
}

const SmallText = ({ children }: SmallTextProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default SmallText;
