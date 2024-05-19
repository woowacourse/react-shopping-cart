import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants";
import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  backgroundColor?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ text, backgroundColor }) => {
  const navigate = useNavigate();

  const navigateToOrderConfirmationPage = () => {
    navigate(PATHS.ORDER_CONFIRMATION);
  };

  return (
    <StyledConfirmButton
      onClick={navigateToOrderConfirmationPage}
      $backgroundColor={backgroundColor}
    >
      {text}
    </StyledConfirmButton>
  );
};
