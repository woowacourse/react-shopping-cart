import { ChangeEvent } from 'react';
import * as S from './CartController.style';
import * as T from '../../types/ProductType';
import cartIcon from '../../assets/cart.svg';
import useCart from '../../hooks/useCart';

interface CartControllerProps {
  product: T.ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, increaseCart, getQuantityByProductId, decreaseCart, setCartQuantity } =
    useCart();

  const quantity = getQuantityByProductId(product.id);
  const isQuantityZero = quantity > 0;

  const handleClickCart = () => {
    addCart(product);
  };

  const handleIncreaseQuantity = () => {
    increaseCart(product.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseCart(product.id);
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    if (quantity < 0 || quantity > 99) {
      return;
    }

    console.log(quantity);

    setCartQuantity(product.id, quantity);
  };

  return (
    <S.ControllerWrapper>
      {isQuantityZero ? (
        <S.CartBox>
          <S.QuantityInput value={quantity} onChange={handleChangeQuantity} />
          <S.ButtonBox>
            <S.QuantityControlButton onClick={handleIncreaseQuantity}>⏶</S.QuantityControlButton>
            <S.QuantityControlButton onClick={handleDecreaseQuantity}>⏷</S.QuantityControlButton>
          </S.ButtonBox>
        </S.CartBox>
      ) : (
        <button onClick={handleClickCart}>
          <img src={cartIcon}></img>
        </button>
      )}
    </S.ControllerWrapper>
  );
}

export default CartController;
