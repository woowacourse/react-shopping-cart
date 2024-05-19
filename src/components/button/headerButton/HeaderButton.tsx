import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/BackIcon.png";
import { HEADER_TYPES, PATHS } from "../../../constants";
import {
  StyledHeaderButtonContainer,
  StyledHeaderButtonContent,
  StyledHeaderButtonImg,
} from "./HeaderButton.styled";

export interface HeaderButtonProps {
  type: (typeof HEADER_TYPES)[keyof typeof HEADER_TYPES];
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  const navigateToCartPage = () => {
    navigate(PATHS.BASE);
  };

  return (
    <StyledHeaderButtonContainer>
      {type === HEADER_TYPES.SHOP ? (
        <StyledHeaderButtonContent onClick={navigateToCartPage}>SHOP</StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} onClick={navigateToCartPage} />
      )}
    </StyledHeaderButtonContainer>
  );
};
