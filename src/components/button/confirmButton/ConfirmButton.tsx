import { useNavigate } from "react-router-dom";
import { BUTTON_COLORS, PATHS } from "../../../constants";
import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  mode?: keyof typeof BUTTON_COLORS;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  mode = BUTTON_COLORS.DARK,
}) => {
  const navigate = useNavigate();

  const navigateToPaymentsConfirmationPage = () => {
    navigate(PATHS.PAYMENTS_CONFIRMATION);
  };

  return (
    <StyledConfirmButton onClick={navigateToPaymentsConfirmationPage} mode={mode}>
      {text}
    </StyledConfirmButton>
  );
};
