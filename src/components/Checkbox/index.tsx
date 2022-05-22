import { useTheme } from "@emotion/react";
import { themeType } from "../../ThemeProvider";
import * as S from "./index.styles";

interface CheckboxProps {
  id: number;
  label?: string;
}

const Checkbox = ({ id, label }: CheckboxProps) => {
  const stringId = String(id);
  const {
    color: { primary },
  } = useTheme() as themeType;
  return (
    <S.CheckboxContainer>
      <S.Checkbox type="checkbox" id={stringId} backgroundColor={primary} />
      <S.Label htmlFor={stringId}>
        <p>✔</p>
      </S.Label>
      <p>{label}</p>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
