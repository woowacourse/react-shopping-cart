import { StyledConfirmButton } from './ConfirmButton.styled';

export interface ConfirmButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  disabled,
  onClick,
}) => {
  return (
    <StyledConfirmButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledConfirmButton>
  );
};
