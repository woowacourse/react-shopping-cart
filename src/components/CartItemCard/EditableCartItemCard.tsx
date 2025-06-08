import QuantityStepper from "../QuantityStepper/QuantityStepper";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import TextButton from "../@common/Button/TextButton/TextButton";
import { useCartItemContext } from "../../contexts/carItem/useCartItemContext";
import CartItemCard from "./CartItemCard";
import { CartItem } from "../../types/type";

interface EditableCartItemCardProps {
  cartItem: CartItem;
  isSelected: boolean;
  handleToggle: (cartItemId: number) => void;
}

const EditableCartItemCard = ({
  cartItem,
  isSelected,
  handleToggle,
}: EditableCartItemCardProps) => {
  const { deleteCartItem, updateCartItem } = useCartItemContext();
  const cartItemId = cartItem.id;
  const quantity = cartItem.quantity;

  return (
    <CartItemCard
      product={cartItem.product}
      topLeftContent={
        <ToggleButton
          isSelected={isSelected}
          onClick={() => handleToggle(cartItemId)}
          testId="item-toggle"
        />
      }
      topRightContent={
        <TextButton text="삭제" onClick={() => deleteCartItem(cartItemId)} />
      }
      quantityContent={
        <div style={{ marginTop: "24px" }}>
          <QuantityStepper
            quantity={quantity}
            onDecrease={() => updateCartItem(cartItemId, quantity - 1)}
            onIncrease={() => updateCartItem(cartItemId, quantity + 1)}
          />
        </div>
      }
    />
  );
};

export default EditableCartItemCard;
