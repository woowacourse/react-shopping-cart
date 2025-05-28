import * as S from "./CheckBox.styles";

type Props = {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
};

const CheckBox = ({ isChecked, onChange, label }: Props) => {
  return (
    // <S.Container htmlFor="checkBox" onClick={onChange}>
    //   <S.HiddenCheckBox id="checkBox" type="CheckBox" />
    //   <S.CheckBox
    //     src={isChecked ? "./checked-icon.svg" : "./unchecked-icon.svg"}
    //   />
    //   {label && <S.Label>{label}</S.Label>}
    // </S.Container>
    <S.Container htmlFor="checkBox">
      <S.HiddenCheckBox id="checkBox" type="CheckBox" />
      <S.CheckBox
        onClick={onChange}
        src={isChecked ? "./checked-icon.svg" : "./unchecked-icon.svg"}
      />
      {label && <S.Label>{label}</S.Label>}
    </S.Container>
  );
};

export default CheckBox;
