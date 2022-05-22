import * as S from "./index.styles";
import upButton from "../../assets/image/up-button.png";
import downButton from "../../assets/image/down-button.png";

const NumberInputButton = () => {
  return (
    <S.NumberInputButtonContainer>
      <S.Input type="number" />
      <S.ButtonContainer>
        <S.operatorButton>
          <S.Image src={upButton} alt="UpButton" />
        </S.operatorButton>
        <S.operatorButton>
          <S.Image src={downButton} alt="DownButton" />
        </S.operatorButton>
      </S.ButtonContainer>
    </S.NumberInputButtonContainer>
  );
};

export default NumberInputButton;
