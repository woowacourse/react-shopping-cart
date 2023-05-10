import * as S from './CartController.style';
import * as T from '../../types/ProductType';
import useCart from '../../hooks/useCart';
import { useEffect, useState } from 'react';

interface CartControllerProps {
  product: T.ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const [quantity, setQuantity] = useState(0);

  const { cartList, addCart, getQuantityByProductId } = useCart();

  const handleClickCart = () => {
    console.log('dd');
    addCart(product);
  };

  useEffect(() => {
    setQuantity(getQuantityByProductId(product.id));
  }, [cartList]);

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
        <button onClick={handleClickCart}>🛒</button>
      )}
    </>
  );
}

export default CartController;
