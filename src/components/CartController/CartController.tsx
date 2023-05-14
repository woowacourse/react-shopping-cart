import { ChangeEvent } from 'react';
import * as S from './CartController.style';
import cartIcon from '../../assets/cart.svg';
import useCart from '../../hooks/useCart';
import type { ProductItem } from '../../types/types';

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, increaseCart, getQuantityByProductId, decreaseCart, setCartQuantity } =
    useCart();
  const quantity = getQuantityByProductId(product.id);

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;
    setCartQuantity(product.id, newQuantity);
  };

  return (
    <S.ControllerWrapper>
      {quantity > 0 ? (
        <S.CartBox>
          <S.QuantityInput value={quantity} onChange={handleChangeQuantity} />
          <S.ButtonBox>
            <S.QuantityControlButton
              onClick={() => {
                increaseCart(product.id);
              }}
            >
              ⏶
            </S.QuantityControlButton>
            <S.QuantityControlButton
              onClick={() => {
                decreaseCart(product.id);
              }}
            >
              ⏷
            </S.QuantityControlButton>
          </S.ButtonBox>
        </S.CartBox>
      ) : (
        <button
          onClick={() => {
            addCart(product);
          }}>
          <img src={cartIcon}></img>
        </button>
      )}
    </S.ControllerWrapper>
  );
}

export default CartController;
