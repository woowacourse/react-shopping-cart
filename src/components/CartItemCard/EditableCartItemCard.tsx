import QuantityStepper from "../QuantityStepper/QuantityStepper";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import TextButton from "../@common/Button/TextButton/TextButton";
import { useCartItemContext } from "../../contexts/useCartItemContext";
import CartItemCard from "./CartItemCard";

interface EditableCartItemCardProps {
  cartItemId: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
  isSelected: boolean;
  handleToggle: (cartItemId: number) => void;
}

const EditableCartItemCard = ({
  cartItemId,
  imgUrl,
  name,
  price,
  quantity,
  isSelected,
  handleToggle,
}: EditableCartItemCardProps) => {
  const { deleteCartItem, updateCartItem } = useCartItemContext();

  return (
    <CartItemCard
      imgUrl={imgUrl}
      name={name}
      price={price}
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
