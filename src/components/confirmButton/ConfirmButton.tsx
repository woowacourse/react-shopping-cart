import { useNavigate } from 'react-router-dom';
import { StyledConfirmButton } from './ConfirmButton.styled';

export interface ConfirmButtonProps {
  text: string;
  disabled: boolean;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  disabled,
}) => {
  const navigate = useNavigate();

  const navigateToOrderConfirmationPage = () => {
    navigate('/order-confirmation');
  };

  return (
    <StyledConfirmButton
      onClick={navigateToOrderConfirmationPage}
      disabled={disabled}
    >
      {text}
    </StyledConfirmButton>
  );
};
