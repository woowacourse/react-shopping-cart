import CartItemCard from "../CartItemCard/CartItemCard";
import { useCartItemContext } from "../../contexts/useCartItemContext";
import { useEffect } from "react";
import LabeledCheckbox from "../@common/LabeledCheckbox/LabeledCheckbox";

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
      <LabeledCheckbox
        labelText="전체선택"
        isSelected={allSelected}
        onClick={handleAllSelected}
        testId="all-select-toggle"
      />
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
