import { ChangeEvent } from 'react';
import cartIcon from '../../assets/cart.svg';
import useCart from '../../hooks/useCart';
import type { ProductItem } from '../../types/types';
import { ButtonBox, CartBox, ControllerWrapper, QuantityControlButton, QuantityInput } from './CartController.style';

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, getQuantityByProductId, increaseCart, decreaseCart, setCartQuantity } =
    useCart();

  const quantity = getQuantityByProductId(product.id);

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;
    setCartQuantity(product.id, newQuantity);
  };

  return (
    <ControllerWrapper>
      {quantity > 0 ? (
        <CartBox>
          <QuantityControlButton
            onClick={() => {
              decreaseCart(product.id);
            }}
          >
            -
          </QuantityControlButton>
          <QuantityInput value={quantity} onChange={handleChangeQuantity} />
          <QuantityControlButton
            onClick={() => {
              increaseCart(product.id);
            }}
          >
            +
          </QuantityControlButton>
        </CartBox>
      ) : (
        <button
          onClick={() => {
            addCart(product);
          }}>
          <img src={cartIcon}></img>
        </button>
      )}
    </ControllerWrapper>
  );
}

export default CartController;
