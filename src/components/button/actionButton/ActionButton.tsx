import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import MinusButtonIcon from "../../../assets/MinusButtonIcon.png";
import PlusButtonIcon from "../../../assets/PlusButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import {
  StyledActionButton,
  StyledActionButtonImg,
  StyledActionButtonText,
} from "./ActionButton.styled";

interface ActionButtonProps {
  clicked?: boolean;
  type: "select" | "delete" | "plus" | "minus";
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
      case "select":
        return clicked ? CheckedButtonIcon : UnCheckedButtonIcon;
      case "plus":
        return PlusButtonIcon;
      case "minus":
        return MinusButtonIcon;
      default:
        return "";
    }
  };

  const handleClick = () => {
    switch (type) {
      case "select":
        if (onSelect) onSelect();
        break;
      case "delete":
        if (disabled) return;
        if (onDelete) onDelete();
        break;
      case "plus":
        if (onPlus) onPlus();
        break;
      case "minus":
        if (onMinus) onMinus();
        break;
      default:
        break;
    }
  };

  return (
    <StyledActionButton onClick={handleClick} disabled={disabled}>
      {type === "delete" && (
        <StyledActionButtonText>삭제</StyledActionButtonText>
      )}
      {(type === "select" || type === "plus" || type === "minus") && (
        <StyledActionButtonImg src={determineSrc()} />
      )}
    </StyledActionButton>
  );
};
