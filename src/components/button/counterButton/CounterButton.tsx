<<<<<<< HEAD
import { MinusButtonIcon, PlusButtonIcon } from "../../../assets";
import { COUNTER_BUTTON_TYPES } from "../../../constants";
import BaseButton from "../baseButton/baseButton";
import { StyledBaseButtonImg } from "../baseButton/baseButton.styled";
=======
import MinusButtonIcon from "../../../assets/MinusButtonIcon.png";
import PlusButtonIcon from "../../../assets/PlusButtonIcon.png";
import { COUNTER_BUTTON_TYPES } from "../../../constants";
import { StyledCounterButton, StyledCounterButtonImg } from "./CounterButton.styled";
>>>>>>> 00kang

interface CounterButtonProps {
  type: (typeof COUNTER_BUTTON_TYPES)[keyof typeof COUNTER_BUTTON_TYPES];
  onClick: () => void;
  disabled?: boolean;
}

export const CounterButton: React.FC<CounterButtonProps> = ({ type, onClick, disabled }) => {
  const src = type === COUNTER_BUTTON_TYPES.INCREMENT ? PlusButtonIcon : MinusButtonIcon;
  return (
<<<<<<< HEAD
    <BaseButton onClick={onClick} disabled={disabled}>
      <StyledBaseButtonImg src={src} />
    </BaseButton>
=======
    <StyledCounterButton onClick={onClick} disabled={disabled}>
      <StyledCounterButtonImg src={src} />
    </StyledCounterButton>
>>>>>>> 00kang
  );
};
