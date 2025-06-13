import { CartItem } from "../../types/type";
import Text from "../@common/Text/Text";
import CartItemCard from "./CartItemCard";

interface ConfirmCartItemCardProps {
  cartItem: CartItem;
}

const ConfirmCartItemCard = ({ cartItem }: ConfirmCartItemCardProps) => {
  const quantity = cartItem.quantity;
  return (
    <CartItemCard
      product={cartItem.product}
      quantityContent={<Text text={`${quantity}개`} />}
    />
  );
};

export default ConfirmCartItemCard;
