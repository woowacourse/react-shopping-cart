import * as S from './style';

function QuantityInputButton() {
  return (
    <S.Container>
      <S.QuantityInput type="number" />
      <S.ButtonWrapper>
        <S.QuantityButton>▲</S.QuantityButton>
        <S.QuantityButton>▼</S.QuantityButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityInputButton;
