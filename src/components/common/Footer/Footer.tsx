import { ReactNode } from "react";
import { Wrapper } from "./style";
import SmallText from "../SmallText/SmallText";

interface FooterProps {
  children?: ReactNode;
  onClick?: () => void;
  disable?: boolean;
}

const Footer = ({ children, onClick, disable = false }: FooterProps) => {
  return (
    <Wrapper onClick={onClick}>
      <SmallText>{children}</SmallText>
    </Wrapper>
  );
};

export default Footer;
