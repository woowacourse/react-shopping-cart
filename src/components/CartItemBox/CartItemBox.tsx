import {
  useCartItemCheckedById,
  useCartItemQuantityById,
} from '../../hooks/cartListState/cartListState';
import { FlexWrapper } from '../../pages/Cart/Cart.style';
import type { ProductItem } from '../../types/ProductType';
import CheckBox from '../common/CheckBox/CheckBox';
import QuantityCounter from '../common/QuantityCounter/QuantityCounter';
import deleteButton from '../../assets/delete.svg';

function CartItemBox({ id, imageUrl, name, price }: ProductItem) {
  // id: cartItem
  const [quantity, setQuantity] = useCartItemQuantityById(id);
  const { isChecked, toggleCheck } = useCartItemCheckedById(id);

  return (
    <FlexWrapper>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          toggleCheck();
        }}
      />
      <img src={imageUrl} />
      <p>{name}</p>
      <p>{price * quantity}</p>
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
      <img
        src={deleteButton}
        onClick={() => {
          setQuantity(0);
        }}
      />
    </FlexWrapper>
  );
}

export default CartItemBox;
