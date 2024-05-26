import { ReactNode } from "react";
import { Wrapper } from "./style";
import SmallText from "../SmallText/SmallText";
import { selectedCartItemsState } from "../../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";

interface FooterProps {
  children?: ReactNode;
  onClick?: () => void;
}

const Footer = ({ children, onClick }: FooterProps) => {
  const selectedCartItemLength = useRecoilValue(selectedCartItemsState).length;

  return (
    <Wrapper
      onClick={selectedCartItemLength === 0 ? undefined : onClick}
      $disable={selectedCartItemLength === 0}
    >
      <SmallText>{children}</SmallText>
    </Wrapper>
  );
};

export default Footer;
