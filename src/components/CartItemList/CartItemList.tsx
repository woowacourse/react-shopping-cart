import { css } from "@emotion/css";
import Text from "../@common/Text/Text";
import CartItemCard from "../CartItemCard/CartItemCard";
import { useCartItemContext } from "../../contexts/useCartItemContext";
import { useEffect } from "react";
import CartItemCheckbox from "../CartItemCheckbox/CartItemCheckbox";

const CartItemCardList = () => {
  const { cartItems, selectedItem, handleSelectedItem } = useCartItemContext();

  const toggleCartItemChecked = (cartItemId: number) => {
    const newSet = new Set(selectedItem);
    if (newSet.has(cartItemId)) newSet.delete(cartItemId);
    else newSet.add(cartItemId);
    handleSelectedItem(newSet);
  };

  const isSelectedItem = (cartItemId: number) => {
    return selectedItem.has(cartItemId);
  };

  const allSelected = selectedItem.size === cartItems.length;

  const handleAllSelected = () => {
    if (allSelected) {
      handleSelectedItem(new Set());
    } else {
      const cartItemIds = cartItems.map((item) => item.id);
      handleSelectedItem(new Set(cartItemIds));
    }
  };

  useEffect(() => {
    const cartItemIds = cartItems.map((item) => item.id);
    handleSelectedItem(new Set(cartItemIds));
  }, []);

  return (
    <>
      <div className={AllSelectContainer}>
        <CartItemCheckbox
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
          toggleCartItemChecked={toggleCartItemChecked}
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
