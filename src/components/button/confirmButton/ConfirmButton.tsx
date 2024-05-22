import { BUTTON_COLORS } from "../../../constants";
import { StyledConfirmButton } from "./ConfirmButton.styled";

export interface ConfirmButtonProps {
  text: string;
  mode?: keyof typeof BUTTON_COLORS;
  onClick: () => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
  mode = BUTTON_COLORS.DARK,
  onClick = () => {},
}) => {
  return (
    <StyledConfirmButton onClick={onClick} mode={mode}>
      {text}
    </StyledConfirmButton>
  );
};
