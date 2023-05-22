import type { ProductItem } from '../../../../types/ProductType';
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
import { useCartItemQuantityBy } from '../../../../recoil/cart/withItemQuantityBy';
import { useCartItemCheckedBy } from '../../../../recoil/cart/withItemCheckBy';

function CartItemBox({ id, imageUrl, name, price }: ProductItem) {
  // id: cartItem
  const [quantity, setQuantity] = useCartItemQuantityBy(id);
  const { isChecked, toggleCheck } = useCartItemCheckedBy(id);

  return (
    <StyleCartItemWrapper>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          toggleCheck();
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
              setQuantity(0);
            }}
          />
        </StyleDeleteBox>
        <Stepper
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
          onIncrease={() => {
            setQuantity(quantity + 1);
          }}
          onDecrease={() => {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
          }}
          quantity={quantity}
        />
        <StylePriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</StylePriceText>
      </StyleProductInfo>
    </StyleCartItemWrapper>
  );
}

export default CartItemBox;
