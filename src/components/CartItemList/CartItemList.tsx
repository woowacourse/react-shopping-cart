import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import CartItemCard from "../CartItemCard/CartItemCard";
import { CartItem } from "../../types/type";
import { useCartItemContext } from "../../contexts/useCartItemContext";
import { useEffect } from "react";

interface CartItemCardListProps {
  cartItems: CartItem[];
}

const CartItemCardList = ({ cartItems }: CartItemCardListProps) => {
  const { selectedItemIds, toggleSelectedItemId, replaceSelectedItemIds } =
    useCartItemContext();

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

  useEffect(() => {
    handleAllSelected();
  }, []);

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
        <CartItemCard
          cartItemId={item.id}
          key={item.id}
          imgUrl={item.product.imageUrl}
          name={item.product.name}
          price={item.product.price}
          quantity={item.quantity}
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
