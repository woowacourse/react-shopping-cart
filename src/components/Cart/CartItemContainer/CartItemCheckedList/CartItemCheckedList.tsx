import { useRecoilValue } from "recoil";
import CartItem from "../CartItem/CartItem";
import { checkedItemList } from "@/store/selector/selectors";

const CartItemCheckedList = () => {
  const checkedItems = useRecoilValue<CartItemInfo[]>(checkedItemList);

  return (
    <div>
      {checkedItems.map((item) => (
        <CartItem CartItemInfo={item} key={item.id} showItemToolbar={false} showQuantityButton={false} />
      ))}
    </div>
  );
};

export default CartItemCheckedList;
