import { useCartItemQuantityById } from '../../hooks/cartListState/cartListState';
import { FlexWrapper } from '../../pages/Cart/Cart.style';
import type { ProductItem } from '../../types/ProductType';
import QuantityCounter from '../common/QuantityCounter/QuantityCounter';

interface CartItemProps extends ProductItem {
  toggle: boolean;
  setToggle: () => void;
}

function CartItemBox({ id, imageUrl, name, price, toggle, setToggle }: CartItemProps) {
  const [quantity, setQuantity] = useCartItemQuantityById(id);
  return (
    <FlexWrapper>
      <input onClick={setToggle} type="checkbox" checked={toggle} readOnly />
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
      <button
        onClick={() => {
          setQuantity(0);
        }}
      >
        delete
      </button>
    </FlexWrapper>
  );
}

export default CartItemBox;
