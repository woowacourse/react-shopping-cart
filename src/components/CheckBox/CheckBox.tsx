import * as S from "./CheckBox.styled";

function CheckBox({
  id = 0,
  isChecked,
  text,
  onChange,
  size = "small",
}: {
  id?: number;
  isChecked: boolean;
  text?: string;
  onChange?: () => void;
  size?: "small" | "large";
}) {
  return (
    <S.CheckBoxWrapper>
      <S.Input
        checked={isChecked}
        type="checkbox"
        id={String(id)}
        onChange={onChange}
      />
      {text && (
        <S.Label size={size} htmlFor={String(id)}>
          {text}
        </S.Label>
      )}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
