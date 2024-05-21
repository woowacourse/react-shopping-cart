import { useRecoilState } from "recoil";
import { updateCartItemQuantity } from "../../../api";
import MinusIcon from "../../../assets/minusIcon.png";
import PlusIcon from "../../../assets/plusIcon.png";
import { cartItemQuantity } from "../../../recoil/atoms";
import BorderButton from "../../common/BorderButton";
import QuantityContainer from "./style";

export default function CartItemQuantity({ itemId }: { itemId: number }) {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(itemId));

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(itemId, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity - 1 >= 0) {
      updateCartItemQuantity(itemId, quantity - 1);
    }

    setQuantity(Math.max(quantity - 1, 0));
  };

  return (
    <QuantityContainer>
      <BorderButton onClick={handleDecreaseQuantity} size="small">
        <img src={MinusIcon} alt="Decrease quantity" />
      </BorderButton>
      <p className="quantity">{quantity}</p>
      <BorderButton onClick={handleIncreaseQuantity} size="small">
        <img src={PlusIcon} alt="Increase quantity" />
      </BorderButton>
    </QuantityContainer>
  );
}
