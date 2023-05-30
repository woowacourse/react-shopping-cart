import type { ProductItemType } from '../../../../types/ProductType';
import CheckBox from '../../../../common/CheckBox/CheckBox';
import Stepper from '../../../../common/Stepper/Stepper';
import deleteButton from '../../../../assets/delete.svg';
import {
  StyleCartItemWrapper,
  StyleDeleteBox,
  StyleDeleteIcon,
  StyleImage,
  StyleImageBox,
  StyleNameText,
  StylePriceText,
  StyleProductInfo,
} from './CartItemBox.style';

import { useCart } from '../../../../recoil/cart/cartState';

function CartItemBox({ id, imageUrl, name, price }: ProductItemType) {
  const { getCartItemQuantity, setCartItemQuantity, getCartItemCheck, setCartItemCheck } =
    useCart();
  const quantity = getCartItemQuantity(id);
  const isChecked = getCartItemCheck(id);

  return (
    <StyleCartItemWrapper>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setCartItemCheck(id, !isChecked);
        }}
        size="medium"
      />
      <StyleImageBox>
        <StyleImage src={imageUrl} />
      </StyleImageBox>
      <StyleNameText>{name}</StyleNameText>

      <StyleProductInfo>
        <StyleDeleteBox>
          <StyleDeleteIcon
            src={deleteButton}
            onClick={() => {
              setCartItemQuantity(id, 0);
            }}
          />
        </StyleDeleteBox>
        <Stepper
          onChange={(event) => {
            setCartItemQuantity(id, Number(event.target.value));
          }}
          onIncrease={() => {
            setCartItemQuantity(id, quantity + 1);
          }}
          onDecrease={() => {
            if (quantity === 1) return;
            setCartItemQuantity(id, quantity - 1);
          }}
          quantity={quantity}
        />
        <StylePriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</StylePriceText>
      </StyleProductInfo>
    </StyleCartItemWrapper>
  );
}

export default CartItemBox;
