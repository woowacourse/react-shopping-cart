import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";

interface InfoTextProps {
  text: string;
}

const InfoText = ({ text }: InfoTextProps) => {
  return (
    <OrderInfo>
      <InfoImg src={IMAGES.infoOutline} />
      {text}
    </OrderInfo>
  );
};

export default InfoText;

const OrderInfo = styled.p`
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  line-height: 15px;
  text-align: left;
  color: ${COLOR.black};
`;

const InfoImg = styled.img`
  padding-right: 4px;
`;
