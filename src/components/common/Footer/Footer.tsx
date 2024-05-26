import { ReactNode } from "react";
import { Wrapper } from "./style";
import { Text } from "../../common";
import { selectedCartItemsState } from "../../../recoil";
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
      <Text size="small">{children}</Text>
    </Wrapper>
  );
};

export default Footer;
