import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import CartItemCard from "../CartItemCard/CartItemCard";
import { CartItem } from "../../types/type";
import { useState } from "react";

interface CartItemCardListProps {
  cartItems: CartItem[];
}

const CartItemCardList = ({ cartItems }: CartItemCardListProps) => {
  const [selectedItem, setSelectedItem] = useState(new Set());

  const handleToggle = (cartItemId: number) => {
    setSelectedItem((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cartItemId)) {
        newSet.delete(cartItemId);
      } else {
        newSet.add(cartItemId);
      }
      return newSet;
    });
  };

  const isSelectedItem = (cartItemId: number) => {
    return selectedItem.has(cartItemId);
  };

  const allSelected = selectedItem.size === cartItems.length;

  const handleAllSelected = () => {
    if (allSelected) {
      setSelectedItem(new Set());
    } else {
      const cartItemIds = cartItems.map((item) => item.id);
      setSelectedItem(new Set(cartItemIds));
    }
  };

  return (
    <>
      <div className={AllSelectContainer}>
        <ToggleButton isSelected={allSelected} onClick={handleAllSelected} />
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
