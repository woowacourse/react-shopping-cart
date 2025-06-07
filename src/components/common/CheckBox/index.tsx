import * as S from './CheckBox.styles';

type Props = {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  testId?: string;
  name?: string;
  disabled?: boolean;
};

const CheckBox = ({
  name,
  disabled,
  isChecked,
  onChange,
  label,
  testId,
}: Props) => {
  return (
    <S.Container>
      <S.HiddenCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        id={`checkbox-${name}`}
        data-testid={testId}
        name={name}
        disabled={disabled}
      />
      <S.CheckBox
        src={isChecked ? './checked-icon.svg' : './unchecked-icon.svg'}
      />
      {label && <S.Label htmlFor={`checkbox-${name}`}>{label}</S.Label>}
    </S.Container>
  );
};

export default CheckBox;
