import CheckedButtonIcon from "../../assets/CheckedButtonIcon.png";
import UnCheckedButtonIcon from "../../assets/UncheckedButtonIcon.png";
import PlusButtonIcon from "../../assets/PlusButtonIcon.png";
import MinusButtonIcon from "../../assets/MinusButtonIcon.png";
import {
  StyledActionButton,
  StyledActionButtonImg,
  StyledActionButtonText,
} from "./ActionButton.styled";

interface ActionButtonProps {
  clicked?: boolean;
  type: "select" | "delete" | "plus" | "minus";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  clicked,
  type,
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

  return (
    <StyledActionButton>
      {type === "delete" && (
        <StyledActionButtonText>삭제</StyledActionButtonText>
      )}
      {(type === "select" || type === "plus" || type === "minus") && (
        <StyledActionButtonImg src={determineSrc()} />
      )}
    </StyledActionButton>
  );
};
