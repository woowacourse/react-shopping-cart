import { BUTTON_COLORS } from "../../../constants";
import BaseButton from "../baseButton/baseButton";
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
    <BaseButton onClick={onClick}>
      <StyledConfirmButton mode={mode}>{text}</StyledConfirmButton>
    </BaseButton>
  );
};
