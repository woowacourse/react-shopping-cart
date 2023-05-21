import {
  useCartItemCheckedById,
  useCartItemQuantityById,
} from '../../hooks/cartListState/cartListState';

import type { ProductItem } from '../../types/ProductType';
import CheckBox from '../common/CheckBox/CheckBox';
import QuantityCounter from '../common/QuantityCounter/QuantityCounter';
import deleteButton from '../../assets/delete.svg';
import {
  StyleCartItemWrapper,
  StyleDeleteBox,
  StyleDeleteIcon,
  StyleImage,
  StyleImageBox,
  StyleNameText,
  StylePriceText,
  StyleProductInfo,
} from './CartItemBox.steyle';

function CartItemBox({ id, imageUrl, name, price }: ProductItem) {
  // id: cartItem
  const [quantity, setQuantity] = useCartItemQuantityById(id);
  const { isChecked, toggleCheck } = useCartItemCheckedById(id);

  return (
    <StyleCartItemWrapper>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          toggleCheck();
        }}
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
        <QuantityCounter
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
          onIncrease={() => {
            setQuantity(quantity + 1);
          }}
          onDecrease={() => {
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
