import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { BackIcon } from "../../../assets";
import { HEADER_TYPES, PATHS } from "../../../constants";
import BaseButton from "../baseButton/baseButton";
import { StyledHeaderButtonContent, StyledHeaderButtonImg } from "./HeaderButton.styled";
=======
import BackIcon from "../../../assets/BackIcon.png";
import { HEADER_TYPES, PATHS } from "../../../constants";
import {
  StyledHeaderButtonContainer,
  StyledHeaderButtonContent,
  StyledHeaderButtonImg,
} from "./HeaderButton.styled";
>>>>>>> 00kang

export interface HeaderButtonProps {
  type: (typeof HEADER_TYPES)[keyof typeof HEADER_TYPES];
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  const navigateToCartPage = () => {
    navigate(PATHS.BASE);
  };

  return (
<<<<<<< HEAD
    <BaseButton onClick={navigateToCartPage}>
      {type === HEADER_TYPES.SHOP ? (
        <StyledHeaderButtonContent>SHOP</StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} />
      )}
    </BaseButton>
=======
    <StyledHeaderButtonContainer>
      {type === HEADER_TYPES.SHOP ? (
        <StyledHeaderButtonContent onClick={navigateToCartPage}>SHOP</StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} onClick={navigateToCartPage} />
      )}
    </StyledHeaderButtonContainer>
>>>>>>> 00kang
  );
};
