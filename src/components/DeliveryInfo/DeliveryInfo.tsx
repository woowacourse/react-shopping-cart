import { Wrapper, Info } from "./style";
import { SmallText, MediumText } from "../common";
import { FilledCheckSvg, OutlineCheckSvg } from "../../assets";

const DeliveryInfo = () => {
  const handleToggle = () => {};

  return (
    <Wrapper>
      <MediumText>배송 정보</MediumText>
      <Info>
        <OutlineCheckSvg />
        <SmallText>제주도 및 도서 산간 지역</SmallText>
      </Info>
    </Wrapper>
  );
};

export default DeliveryInfo;
