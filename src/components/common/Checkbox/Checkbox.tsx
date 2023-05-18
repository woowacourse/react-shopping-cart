import { memo, InputHTMLAttributes } from "react";
import Styled from "./CheckboxStyled";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
}

const Checkbox = ({ isChecked, ...props }: CheckboxProps) => {
  return (
    <Styled.Checkbox
      type="checkbox"
      checked={isChecked}
      {...props}
    ></Styled.Checkbox>
  );
};

export default memo(Checkbox);
