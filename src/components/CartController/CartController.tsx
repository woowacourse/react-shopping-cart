import * as S from './CartController.style';
interface CartControllerProps {
  quantity: number;
}

function CartController({ quantity }: CartControllerProps) {
  return (
    <>
      {quantity > 0 ? (
        <S.CartBox>
          <S.QuantityInput value={quantity} />
          <S.ButtonBox>
            <S.QuantityControlButton>⏶</S.QuantityControlButton>
            <S.QuantityControlButton>⏷</S.QuantityControlButton>
          </S.ButtonBox>
        </S.CartBox>
      ) : (
        <button>🛒</button>
      )}
    </>
  );
}

export default CartController;
