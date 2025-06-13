import EmptyCheckbox from "/empty-check.svg";
import FilledCheckbox from "/filled-check.svg";
import * as S from "./Checkbox.styles";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Checkbox = ({ selected, onClick, disabled = false, ...props }: Props) => {
  return (
    <S.Checkbox
      $disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onClick()}
      {...props}
    >
      {selected ? (
        <img src={FilledCheckbox} alt="filled-checkbox" />
      ) : (
        <img src={EmptyCheckbox} alt="empty-checkbox" />
      )}
    </S.Checkbox>
  );
};

export default Checkbox;
