import { Wrapper } from "./style";
import { ReactNode } from "react";

interface NormalTextProps {
  children: ReactNode;
}

const NormalText = ({ children }: NormalTextProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default NormalText;
