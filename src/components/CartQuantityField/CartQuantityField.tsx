import * as S from './CartQuantityField.style';
import * as T from '../../types/ProductType';

import QuantityCounter from '../common/Stepper';
import cartIcon from '../../assets/cart.svg';
import { useCartItemQuantityById } from '../../hooks/cartListState/cartListState';

interface CartQuantityFieldProps {
  product: T.ProductItem;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const [quantity, setQuantity] = useCartItemQuantityById(product.id);

  const isQuantityZero = quantity > 0;

  return (
    <S.ControllerWrapper>
      {isQuantityZero ? (
        <QuantityCounter
          quantity={quantity}
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
          onIncrease={() => {
            setQuantity(quantity + 1);
          }}
          onDecrease={() => {
            setQuantity(quantity - 1);
          }}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={() => {
            setQuantity(1);
          }}
          type="button"
          aria-label={`${product.name}를 장바구니에 담기`}
          role="cart-icon"
        >
          <img src={cartIcon}></img>
        </S.CartIcon>
      )}
    </S.ControllerWrapper>
  );
}

export default CartQuantityField;
