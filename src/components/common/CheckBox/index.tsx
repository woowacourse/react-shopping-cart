import { useState } from "react";
import * as S from "./CheckBox.styles";

type Props = {
  isChecked: boolean;
  onChange: () => void;
};

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <S.Container htmlFor="checkBox">
      <S.HiddenCheckBox
        id="checkBox"
        type="CheckBox"
        onChange={() => setIsChecked(!isChecked)}
      />
      <S.CheckBox
        src={isChecked ? "./checked-icon.svg" : "./unchecked-icon.svg"}
      />
      <S.Label>전체 선택</S.Label>
    </S.Container>
  );
};

export default CheckBox;
