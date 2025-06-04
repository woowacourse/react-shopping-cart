import CheckBox from "../../../../../components/common/CheckBox";
import { useOrderListContext } from "../../../context/OrderListProvider";

function CartItemCheckbox({ cartId }: { cartId: string }) {
  const { selectionMap, setSelectionMap } = useOrderListContext();

  const handleToggleSelection = (cartId: string) => {
    setSelectionMap((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };
  return (
    <CheckBox
      isChecked={selectionMap[cartId]}
      onToggle={() => handleToggleSelection(cartId)}
      role={"cart-item-checkbox"}
      aria-checked={selectionMap[cartId]}
    />
  );
}
export default CartItemCheckbox;
