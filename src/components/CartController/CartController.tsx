import {ChangeEvent} from 'react';
import useCart from '../../hooks/useCart';
import type {ProductItem} from '../../types/types';
import {AddCartButton, CartBox, ControllerWrapper, QuantityControlButton, QuantityInput} from './CartController.style';
import {quantityByProductIdSelector, updateCartItemQuantitySelector} from '../../recoil/cartAtoms';
import {useRecoilValue, useSetRecoilState} from 'recoil';

interface CartControllerProps {
  product: ProductItem;
}

function CartController({product}: CartControllerProps) {
  const {addCart} =
    useCart();

  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));
  const updateCartItemQuantity = useSetRecoilState(updateCartItemQuantitySelector(product.id));

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(quantity - 1);
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput value={quantity} onChange={handleChangeQuantity}/>
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(quantity + 1);
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
