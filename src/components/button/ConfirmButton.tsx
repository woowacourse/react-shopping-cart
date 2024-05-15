import { useNavigate } from "react-router-dom";
import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  backgroundColor?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  backgroundColor,
}) => {
  const navigate = useNavigate();

  const navigateToOrderConfirmationPage = () => {
    navigate("/order-confirmation");
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
