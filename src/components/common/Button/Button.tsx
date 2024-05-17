import { Wrapper } from "./style";
import { ButtonProps } from "../../../types/button";

const Button = ({ children, ...rest }: ButtonProps) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Button;
