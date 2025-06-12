import CheckIcon from "@/components/icons/CheckIcon";
import * as S from "./Checkbox.styles";
import { theme } from "@/styles";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export default function Checkbox({ checked, ...props }: CheckboxProps) {
  return (
    <S.CheckboxWrapper checked={checked} {...props}>
      <CheckIcon color={checked ? theme.colors.white : theme.colors.gray} />
    </S.CheckboxWrapper>
  );
}
