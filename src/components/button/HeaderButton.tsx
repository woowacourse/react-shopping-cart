import {
  StyledHeaderButtonContainer,
  StyledHeaderButtonContent,
  StyledHeaderButtonImg,
} from "./HeaderButton.styled";
import BackIcon from "../../assets/BackIcon.png";

export interface HeaderButtonProps {
  type: "shop" | "back";
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ type }) => {
  return (
    <StyledHeaderButtonContainer>
      {type === "shop" ? (
        <StyledHeaderButtonContent>SHOP</StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} />
      )}
    </StyledHeaderButtonContainer>
  );
};
