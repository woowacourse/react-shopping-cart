import { useRecoilState } from 'recoil';
import { cartItemQuantity } from '../../../recoil/atoms';
import { updateCartItemQuantity } from '../../../api';

export default function CartItemQuantity({ itemId }: { itemId: number }) {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(itemId));

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(itemId, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    updateCartItemQuantity(itemId, quantity - 1);
    setQuantity(quantity - 1);
  };

  return (
    <div className="quantityContainer">
      <button type="button" onClick={handleDecreaseQuantity}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button type="button" onClick={handleIncreaseQuantity}>
        +
      </button>
    </div>
  );
}
