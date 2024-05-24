import InfoIcon from '../../../assets/InfoIcon.png';
import {
  StyledDeliveryInfo,
  StyledDeliveryInfoImg,
  StyledDeliveryInfoText,
} from './Info.styled';

export interface InfoProps {
  message: string;
}

export const Info: React.FC<InfoProps> = ({ message }) => {
  return (
    <StyledDeliveryInfo>
      <StyledDeliveryInfoImg src={InfoIcon} alt='info' />
      <StyledDeliveryInfoText>{message}</StyledDeliveryInfoText>
    </StyledDeliveryInfo>
  );
};
