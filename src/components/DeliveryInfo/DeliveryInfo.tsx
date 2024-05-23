import { Wrapper, Info } from "./style";
import { SmallText, MediumText } from "../common";
import { FilledCheckSvg, OutlineCheckSvg } from "../../assets";
import { useRecoilState } from "recoil";
import { extremeDeliveryState } from "../../recoil/atoms/atoms";

const DeliveryInfo = () => {
  const handleToggle = () => {
    setExtremeDelivery(!extremeDelivery);
  };
  const [extremeDelivery, setExtremeDelivery] =
    useRecoilState(extremeDeliveryState);

  return (
    <Wrapper>
      <MediumText>배송 정보</MediumText>
      <Info>
        {extremeDelivery ? (
          <FilledCheckSvg onClick={handleToggle} />
        ) : (
          <OutlineCheckSvg onClick={handleToggle} />
        )}
        <SmallText>제주도 및 도서 산간 지역</SmallText>
      </Info>
    </Wrapper>
  );
};

export default DeliveryInfo;
