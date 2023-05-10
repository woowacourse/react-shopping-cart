import * as S from './CartController.style';
import * as T from '../../types/ProductType';
import useCart from '../../hooks/useCart';
import { ChangeEvent, useState } from 'react';

interface CartControllerProps {
  product: T.ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCart, increaseCart, getQuantityByProductId, decreaseCart, setCartQuantity } =
    useCart();
  const [quantity, setQuantity] = useState(() => getQuantityByProductId(product.id));

  const handleClickCart = () => {
    setQuantity(1);
    addCart(product);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    increaseCart(product.id);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1);

    decreaseCart(product.id);
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    setQuantity(quantity);
    setCartQuantity(product.id, quantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <S.CartBox>
          <S.QuantityInput value={quantity} onChange={handleChangeQuantity} />
          <S.ButtonBox>
            <S.QuantityControlButton onClick={handleIncreaseQuantity}>⏶</S.QuantityControlButton>
            <S.QuantityControlButton onClick={handleDecreaseQuantity}>⏷</S.QuantityControlButton>
          </S.ButtonBox>
        </S.CartBox>
      ) : (
        <button onClick={handleClickCart}>🛒</button>
      )}
    </>
  );
}

export default CartController;
