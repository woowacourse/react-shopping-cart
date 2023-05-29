import * as S from './CartQuantityField.style';
import * as T from '../../../../types/ProductType';

import QuantityCounter from '../../../../common/Stepper';
import cartIcon from '../../../../assets/cart.svg';
import { useCart } from '../../../../recoil/cart/cartState';

interface CartQuantityFieldProps {
  product: T.ProductItemType;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const { getCartItemQuantity, setCartItemQuantity, addCartItem } = useCart();
  const quantity = getCartItemQuantity(product.id);

  const isQuantityZero = quantity > 0;

  return (
    <S.ControllerWrapper>
      {isQuantityZero ? (
        <QuantityCounter
          quantity={quantity}
          onChange={(event) => {
            setCartItemQuantity(product.id, Number(event.target.value));
          }}
          onIncrease={() => {
            setCartItemQuantity(product.id, quantity + 1);
          }}
          onDecrease={() => {
            setCartItemQuantity(product.id, quantity - 1);
          }}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={() => {
            addCartItem(product.id);
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
