import { getShoppingCartData } from "../../../../../api/cart";
import CheckBox from "../../../../../components/common/CheckBox";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../../context/OrderListProvider";

function CartItemCheckbox({ cartId }: { cartId: string }) {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectionMap, setSelectionMap } = useOrderListContext(cartListData);

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
