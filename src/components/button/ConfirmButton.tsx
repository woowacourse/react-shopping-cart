import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  backgroundColor?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  backgroundColor,
}) => {
  return (
    <StyledConfirmButton backgroundColor={backgroundColor}>
      {text}
    </StyledConfirmButton>
  );
};
