import CheckIcon from "@/components/icons/CheckIcon";
import * as S from "./Checkbox.styles";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export default function Checkbox({ checked, ...props }: CheckboxProps) {
  return (
    <S.CheckboxWrapper checked={checked} {...props}>
      <CheckIcon color={checked ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.1)"} />
    </S.CheckboxWrapper>
  );
}
