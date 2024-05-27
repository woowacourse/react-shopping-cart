import { ReactNode } from "react";
import { Wrapper } from "./style";
import { Text } from "../../common";
import { infoOutline } from "../../../assets";

interface TipProps {
  children?: ReactNode;
}

const Tip = ({ children }: TipProps) => {
  return (
    <Wrapper>
      <img src={infoOutline} />
      <Text size="small">{children}</Text>
    </Wrapper>
  );
};

export default Tip;
