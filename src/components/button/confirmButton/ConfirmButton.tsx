<<<<<<< HEAD
import { BUTTON_COLORS } from "../../../constants";
import BaseButton from "../baseButton/baseButton";
=======
import { useNavigate } from "react-router-dom";
import { BUTTON_COLORS, PATHS } from "../../../constants";
>>>>>>> 00kang
import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  mode?: keyof typeof BUTTON_COLORS;
<<<<<<< HEAD
  onClick: () => void;
=======
>>>>>>> 00kang
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  mode = BUTTON_COLORS.DARK,
<<<<<<< HEAD
  onClick = () => {},
}) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledConfirmButton mode={mode}>{text}</StyledConfirmButton>
    </BaseButton>
=======
}) => {
  const navigate = useNavigate();

  const navigateToOrderConfirmationPage = () => {
    navigate(PATHS.ORDER_CONFIRMATION);
  };

  return (
    <StyledConfirmButton onClick={navigateToOrderConfirmationPage} mode={mode}>
      {text}
    </StyledConfirmButton>
>>>>>>> 00kang
  );
};
