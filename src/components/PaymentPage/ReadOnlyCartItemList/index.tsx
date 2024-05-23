import { useRecoilValue } from "recoil";
import ReadOnlyCartItemView from "./ReadOnlyCartItemView";
import { cartItemsState } from "../../../recoil/cartItems";

export default function ReadOnlyCartItemList() {
  const cartItems = useRecoilValue(cartItemsState);
  const selectedCartItems = cartItems.filter(({ isSelected }) => isSelected);

  return (
    <div>
      {selectedCartItems.map((cartItem) => (
        <ReadOnlyCartItemView key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}
