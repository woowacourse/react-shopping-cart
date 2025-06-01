import CheckIcon from "@/components/icons/CheckIcon";
import * as S from "./Checkbox.styles";

interface CheckboxProps {
  checked: boolean;
  onClick?: () => void;
}

export default function Checkbox({ checked, onClick }: CheckboxProps) {
  return (
    <S.CheckboxWrapper checked={checked}>
      <S.CheckboxInput type="checkbox" checked={checked} onChange={onClick} aria-checked={checked} />
      <CheckIcon color={checked ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.1)"} />
    </S.CheckboxWrapper>
  );
}
