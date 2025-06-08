import { getShoppingCartData } from "../../../../../api/cart";
import CheckBox from "../../../../../components/common/CheckBox";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../../context/OrderListProvider";

function CartItemCheckbox({ cartId }: { cartId: string }) {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, setSelectedCartItems } = useOrderListContext(cartListData);

  const isChecked = selectedCartItems.some(item => item.id === cartId);

  const handleToggleSelection = (cartId: string) => {
    setSelectedCartItems(prev => {
      const cart = cartListData?.find(item => item.id === cartId);
      if (!cart) return prev;

      if (isChecked) {
        return prev.filter(item => item.id !== cartId);
      } else {
        return [...prev, cart];
      }
    });
  };

  return (
    <CheckBox
      isChecked={isChecked}
      onToggle={() => handleToggleSelection(cartId)}
      role={"cart-item-checkbox"}
      aria-checked={isChecked}
    />
  );
}

export default CartItemCheckbox;
