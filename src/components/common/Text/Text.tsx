import { Wrapper } from "./style";
import { ReactNode } from "react";

interface TextProps {
  children?: ReactNode;
  size?: "small" | "medium" | "large";
}

const Text = ({ children, size = "medium" }: TextProps) => {
  return <Wrapper size={size}>{children}</Wrapper>;
};

export default Text;
