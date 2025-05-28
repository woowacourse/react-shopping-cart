import * as S from "./CheckBox.styles";

type Props = {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
};

const CheckBox = ({ isChecked, onChange, label }: Props) => {
  return (
    <S.Container>
      <S.HiddenCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        id="checkbox"
      />
      <S.CheckBox
        src={isChecked ? "./checked-icon.svg" : "./unchecked-icon.svg"}
      />
      {label && <S.Label htmlFor="checkbox">{label}</S.Label>}
    </S.Container>
  );
};

export default CheckBox;
