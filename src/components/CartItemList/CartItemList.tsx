import CartItemCard from "../CartItemCard/CartItemCard";
import LabeledSelectbox from "../@common/LabeledSelectbox/LabeledSelectbox";
import { useCartItemContext } from "../../contexts/CartItemContext";

const CartItemCardList = () => {
  const { cartItems, selectedItems, handleSelectedItems } =
    useCartItemContext();

  const toggleCartItemChecked = (cartItemId: number) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(cartItemId)) newSet.delete(cartItemId);
    else newSet.add(cartItemId);
    handleSelectedItems(newSet);
  };

  const isSelectedItem = (cartItemId: number) => {
    return selectedItems.has(cartItemId);
  };

  const allSelected = selectedItems.size === cartItems.length;

  const handleAllSelected = () => {
    if (allSelected) {
      handleSelectedItems(new Set());
    } else {
      const cartItemIds = cartItems.map((item) => item.id);
      handleSelectedItems(new Set(cartItemIds));
    }
  };

  return (
    <>
      <LabeledSelectbox
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
