import * as S from './style';

import ShoppingCart from '@Asset/ShoppingCart.png';

type QuantityControllerProps = {
  quantity: number;
};

function QuantityController({ quantity }: QuantityControllerProps) {
  return quantity === 0 ? (
    <S.ShoppingCartIcon src={ShoppingCart}></S.ShoppingCartIcon>
  ) : (
    <S.Container>
      <S.QuantityInput type="number" value={quantity} />
      <S.ButtonWrapper>
        <S.QuantityControlButton disabled={quantity >= 99}>▲</S.QuantityControlButton>
        <S.QuantityControlButton disabled={quantity <= 0}>▼</S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
