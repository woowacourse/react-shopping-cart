import EmptyCheckbox from "/empty-check.svg";
import FilledCheckbox from "/filled-check.svg";
import * as S from "./Checkbox.styles";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  checked: boolean;
}

const Checkbox = ({ checked, onClick, ...props }: Props) => {
  return (
    <S.Checkbox onClick={onClick} {...props}>
      {checked ? (
        <img src={FilledCheckbox} alt="filled-checkbox" />
      ) : (
        <img src={EmptyCheckbox} alt="empty-checkbox" />
      )}
    </S.Checkbox>
  );
};

export default Checkbox;
