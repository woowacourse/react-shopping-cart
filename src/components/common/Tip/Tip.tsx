import { ReactNode } from "react";
import { Wrapper } from "./style";
import SmallText from "../SmallText/SmallText";
import { infoOutline } from "../../../assets";

interface TipProps {
  children?: ReactNode;
}

const Tip = ({ children }: TipProps) => {
  return (
    <Wrapper>
      <img src={infoOutline} />
      <SmallText>{children}</SmallText>
    </Wrapper>
  );
};

export default Tip;
