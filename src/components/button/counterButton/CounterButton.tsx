import MinusButtonIcon from "../../../assets/MinusButtonIcon.png";
import PlusButtonIcon from "../../../assets/PlusButtonIcon.png";
import { COUNTER_BUTTON_TYPES } from "../../../constants";
import { StyledCounterButton, StyledCounterButtonImg } from "./CounterButton.styled";

interface CounterButtonProps {
  type: (typeof COUNTER_BUTTON_TYPES)[keyof typeof COUNTER_BUTTON_TYPES];
  onClick: () => void;
  disabled?: boolean;
}

export const CounterButton: React.FC<CounterButtonProps> = ({ type, onClick, disabled }) => {
  const src = type === COUNTER_BUTTON_TYPES.INCREMENT ? PlusButtonIcon : MinusButtonIcon;
  return (
    <StyledCounterButton onClick={onClick} disabled={disabled}>
      <StyledCounterButtonImg src={src} />
    </StyledCounterButton>
  );
};
