import * as S from "./CheckBox.styles";

type Props = {
  isChecked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
  testId?: string;
};

const CheckBox = ({ isChecked, onChange, label, testId, disabled }: Props) => {
  return (
    <S.Container>
      <S.HiddenCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        id="checkbox"
        data-testid={testId}
        disabled={disabled}
      />
      <S.CheckBox
        src={isChecked ? "./checked-icon.svg" : "./unchecked-icon.svg"}
        disabled={Boolean(disabled)}
      />
      {label && (
        <S.Label htmlFor="checkbox" disabled={Boolean(disabled)}>
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};

export default CheckBox;
