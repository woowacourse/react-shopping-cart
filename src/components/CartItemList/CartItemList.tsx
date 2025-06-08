import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import { CartItem } from "../../types/type";
import EditableCartItemCard from "../CartItemCard/EditableCartItemCard";
import { useSelectedCartItemContext } from "../../contexts/selectedCartItem/useSelectedCartItemContext";

interface CartItemCardListProps {
  cartItems: CartItem[];
}

const CartItemCardList = ({ cartItems }: CartItemCardListProps) => {
  const { selectedItemIds, toggleSelectedItemId, replaceSelectedItemIds } =
    useSelectedCartItemContext();

  const isSelectedItem = (cartItemId: number) => {
    return selectedItemIds.has(cartItemId);
  };

  const allSelected = selectedItemIds.size === cartItems.length;

  const handleToggle = (cartItemId: number) => {
    toggleSelectedItemId(cartItemId);
  };

  const handleAllSelected = () => {
    replaceSelectedItemIds(allSelected ? [] : cartItems.map((item) => item.id));
  };

  return (
    <>
      <div className={AllSelectContainer}>
        <ToggleButton
          isSelected={allSelected}
          onClick={handleAllSelected}
          testId="all-select-toggle"
        />
        <Text text="전체선택" />
      </div>
      {cartItems.map((item) => (
        <EditableCartItemCard
          key={item.id}
          cartItem={item}
          isSelected={isSelectedItem(item.id)}
          handleToggle={handleToggle}
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
