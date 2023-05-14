import { ChangeEvent } from 'react';

import * as S from './CartQuantityField.style';
import * as T from '../../types/ProductType';

import QuantityCounter from '../common/QuantityCounter';
import useCartList from '../../hooks/useCartList';
import cartIcon from '../../assets/cart.svg';

import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../constants/cartConstants';

interface CartQuantityFieldProps {
  product: T.ProductItem;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const { addCart, increaseCart, getQuantityByProductId, decreaseCart, setCartQuantity } =
    useCartList();

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
        <QuantityCounter
          quantity={quantity}
          onChange={handleChangeQuantity}
          onIncrease={() => {
            increaseCart(product.id);
          }}
          onDecrease={() => {
            decreaseCart(product.id);
          }}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수인 ${quantity}에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수인 ${quantity}에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={() => {
            addCart(product);
          }}
          type="button"
          aria-label={`${product.name}를 장바구니에 담기`}
          role="button"
        >
          <img src={cartIcon}></img>
        </S.CartIcon>
      )}
    </S.ControllerWrapper>
  );
}

export default CartQuantityField;
