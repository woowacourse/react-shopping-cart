import { StyledBaseButton } from "./baseButton.styled";

interface BaseButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <StyledBaseButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledBaseButton>
  );
};

export default BaseButton;
