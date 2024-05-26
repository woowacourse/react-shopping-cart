import { Wrapper, Info } from "./style";
import { Text } from "../common";
import { FilledCheckSvg, OutlineCheckSvg } from "../../assets";
import { useRecoilState } from "recoil";
import { extremeDeliveryState } from "../../recoil/atoms/atoms";

const DeliveryInfo = () => {
  const handleToggle = () => {
    setExtremeDelivery(!extremeDelivery);
  };
  const [extremeDelivery, setExtremeDelivery] = useRecoilState(extremeDeliveryState);

  return (
    <Wrapper>
      <Text size="medium">배송 정보</Text>
      <Info>
        {extremeDelivery ? (
          <FilledCheckSvg onClick={handleToggle} />
        ) : (
          <OutlineCheckSvg onClick={handleToggle} />
        )}
        <Text size="small">제주도 및 도서 산간 지역</Text>
      </Info>
    </Wrapper>
  );
};

export default DeliveryInfo;
