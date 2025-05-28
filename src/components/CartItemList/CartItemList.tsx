import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import CartItemCard from "../CartItemCard/CartItemCard";
import { CartItem } from "../../types/type";

interface CartItemCardListProps {
  isAllSelected: boolean;
  cartItems: CartItem[];
}

const CartItemCardList = ({
  isAllSelected,
  cartItems,
}: CartItemCardListProps) => {
  return (
    <>
      <div className={AllSelectContainer}>
        <ToggleButton isSelected={isAllSelected} />
        <Text text="전체선택" />
      </div>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          imgUrl={item.product.imageUrl}
          name={item.product.name}
          price={item.product.price}
          quantity={item.quantity}
          isSelected={item.isSelected}
        />
      ))}
    </>
  );
};

export default CartItemCardList;

const AllSelectContainer = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
`;
