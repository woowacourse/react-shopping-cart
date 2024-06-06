import { InfoIcon } from "../../assets";
import {
  StyledInfoDescriptionContainer,
  StyledInfoDescriptionImg,
  StyledInfoDescriptionText,
} from "./InfoDescription.styled";

export const InfoDescription: React.FC<{ text: string }> = ({ text }) => {
  return (
    <StyledInfoDescriptionContainer>
      <StyledInfoDescriptionImg src={InfoIcon} alt="info" />
      <StyledInfoDescriptionText>{text}</StyledInfoDescriptionText>
    </StyledInfoDescriptionContainer>
  );
};
