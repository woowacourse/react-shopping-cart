import * as S from "./index.styles";
import upButton from "../../../assets/image/up-button.png";
import downButton from "../../../assets/image/down-button.png";
import React from "react";

interface NumberInputButtonProps {
  value?: number;
  upButtonClick?: () => void;
  downButtonClick?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInputButton = ({
  value,
  upButtonClick,
  downButtonClick,
  handleChange,
}: NumberInputButtonProps) => {
  const block = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ".") e.preventDefault();
  };
  return (
    <S.NumberInputButtonContainer>
      <S.Input
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={block}
      />
      <S.ButtonContainer>
        <S.operatorButton onClick={upButtonClick}>
          <S.Image src={upButton} alt="UpButton" />
        </S.operatorButton>
        <S.operatorButton onClick={downButtonClick}>
          <S.Image src={downButton} alt="DownButton" />
        </S.operatorButton>
      </S.ButtonContainer>
    </S.NumberInputButtonContainer>
  );
};

export default NumberInputButton;
