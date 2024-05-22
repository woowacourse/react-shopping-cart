import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/BackIcon.png";
import { HEADER_TYPES, PATHS } from "../../../constants";
import { StyledHeaderButtonContent, StyledHeaderButtonImg } from "./HeaderButton.styled";
import BaseButton from "../baseButton/baseButton";

export interface HeaderButtonProps {
  type: (typeof HEADER_TYPES)[keyof typeof HEADER_TYPES];
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  const navigateToCartPage = () => {
    navigate(PATHS.BASE);
  };

  return (
    <BaseButton onClick={navigateToCartPage}>
      {type === HEADER_TYPES.SHOP ? (
        <StyledHeaderButtonContent>SHOP</StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} />
      )}
    </BaseButton>
  );
};
