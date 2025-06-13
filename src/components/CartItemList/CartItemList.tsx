import CartItemCard from "../CartItemCard/CartItemCard";
import LabeledSelectbox from "../@common/LabeledSelectbox/LabeledSelectbox";
import { useCartItemContext } from "../../contexts/CartItemContext";

const CartItemCardList = () => {
  const {
    cartItems,
    selectedItems,
    toggleSelectedItem,
    selectAllItems,
    clearSelectedItems,
  } = useCartItemContext();

  const isSelectedItem = (cartItemId: number) => {
    return selectedItems.has(cartItemId);
  };

  const allSelected =
    selectedItems.size === cartItems.length && cartItems.length > 0;

  const handleAllSelected = () => {
    if (allSelected) {
      clearSelectedItems();
    } else {
      selectAllItems();
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
          toggleCartItemChecked={toggleSelectedItem}
        />
      ))}
    </>
  );
};

export default CartItemCardList;
