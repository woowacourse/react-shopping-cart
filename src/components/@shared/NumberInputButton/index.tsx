import * as S from "./index.styles";
import upButton from "../../../assets/image/up-button.png";
import downButton from "../../../assets/image/down-button.png";
import React from "react";
import Button from "../Button";

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
        <Button
          onClick={upButtonClick}
          icon={upButton}
          alt={"UpButton"}
          css={S.operatorButtonStyle}
        />
        <Button
          onClick={downButtonClick}
          icon={downButton}
          alt={"DownButton"}
          css={S.operatorButtonStyle}
        />
      </S.ButtonContainer>
    </S.NumberInputButtonContainer>
  );
};

export default NumberInputButton;
