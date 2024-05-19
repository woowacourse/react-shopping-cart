import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import MinusButtonIcon from "../../../assets/MinusButtonIcon.png";
import PlusButtonIcon from "../../../assets/PlusButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import { ACTION_TYPES } from "../../../constants";
import {
  StyledActionButton,
  StyledActionButtonImg,
  StyledActionButtonText,
} from "./ActionButton.styled";

interface ActionButtonProps {
  clicked?: boolean;
  type: (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];
  onDelete?: () => void;
  onSelect?: () => void;
  onPlus?: () => void;
  onMinus?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  clicked,
  type,
  onDelete,
  onSelect,
  onPlus,
  onMinus,
  disabled,
}) => {
  const determineSrc = () => {
    switch (type) {
      case ACTION_TYPES.SELECT:
        return clicked ? CheckedButtonIcon : UnCheckedButtonIcon;
      case ACTION_TYPES.PLUS:
        return PlusButtonIcon;
      case ACTION_TYPES.MINUS:
        return MinusButtonIcon;
      default:
        return "";
    }
  };

  const handleClick = () => {
    switch (type) {
      case ACTION_TYPES.SELECT:
        if (onSelect) onSelect();
        break;
      case ACTION_TYPES.DELETE:
        if (disabled) return;
        if (onDelete) onDelete();
        break;
      case ACTION_TYPES.PLUS:
        if (onPlus) onPlus();
        break;
      case ACTION_TYPES.MINUS:
        if (onMinus) onMinus();
        break;
      default:
        break;
    }
  };

  return (
    <StyledActionButton onClick={handleClick} disabled={disabled}>
      {type === ACTION_TYPES.DELETE && <StyledActionButtonText>삭제</StyledActionButtonText>}
      {(type === ACTION_TYPES.SELECT ||
        type === ACTION_TYPES.PLUS ||
        type === ACTION_TYPES.MINUS) && <StyledActionButtonImg src={determineSrc()} />}
    </StyledActionButton>
  );
};
