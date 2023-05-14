import { ChangeEvent } from 'react';
import * as S from './CartController.style';
import * as T from '../../types/ProductType';
import cartIcon from '../../assets/cart.svg';
import useCart from '../../hooks/useCart';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../constants/cartConstants';

interface CartControllerProps {
  product: T.ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, increaseCart, getQuantityByProductId, decreaseCart, setCartQuantity } =
    useCart();

  const quantity = getQuantityByProductId(product.id);
  const isQuantityZero = quantity > 0;

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));

    if (quantity >= MIN_CART_QUANTITY || quantity <= MAX_CART_QUANTITY) {
      setCartQuantity(product.id, quantity);
    }
  };

  return (
    <S.ControllerWrapper>
      {isQuantityZero ? (
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
          }}
        >
          <img src={cartIcon}></img>
        </button>
      )}
    </S.ControllerWrapper>
  );
}

export default CartController;
