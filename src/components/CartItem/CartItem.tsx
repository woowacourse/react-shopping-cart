import { useCartItemQuantityById } from '../../hooks/cartListState/cartListState';
import { FlexWrapper } from '../../pages/Cart/Cart.style';
import { ProductItem } from '../../types/ProductType';
import QuantityCounter from '../common/QuantityCounter/QuantityCounter';

type CartItemProps = ProductItem;

function CartItem({ id, imageUrl, name, price }: CartItemProps) {
  const [quantity, setQuantity] = useCartItemQuantityById(id);
  return (
    <FlexWrapper>
      <input type="checkbox" />
      <img src={imageUrl} />
      <p>{name}</p>
      <p>{price}</p>
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

export default CartItem;
