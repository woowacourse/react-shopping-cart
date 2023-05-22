import { ChangeEvent } from 'react';
import useCart from '../../hooks/useCart';
import type { ProductItem } from '../../types/types';
import { AddCartButton, CartBox, ControllerWrapper, QuantityControlButton, QuantityInput } from './CartController.style';
import { cartState } from '../../recoil/cartAtoms';
import { useRecoilValue } from 'recoil';
import { getQuantityByProductId } from '../../domain/cart';

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, setCartQuantity } =
    useCart();

  const cartList = useRecoilValue(cartState);
  const quantity = getQuantityByProductId(cartList, product.id);

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;
    setCartQuantity(product.id, newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                setCartQuantity(product.id, quantity - 1);
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <QuantityControlButton
              onClick={() => {
                setCartQuantity(product.id, quantity + 1);
              }}
            >
              +
            </QuantityControlButton>
          </CartBox>
        </ControllerWrapper>
      ) : (
        <AddCartButton
          onClick={() => {
            addCart(product);
          }}>
          장바구니에 담기
        </AddCartButton>
      )}
    </>
  );
}

export default CartController;
