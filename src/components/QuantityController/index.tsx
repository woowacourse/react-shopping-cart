import * as S from './style';

function QuantityController() {
  return (
    <S.Container>
      <S.QuantityInput type="number" />
      <S.ButtonWrapper>
        <S.QuantityControlButton>▲</S.QuantityControlButton>
        <S.QuantityControlButton>▼</S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
