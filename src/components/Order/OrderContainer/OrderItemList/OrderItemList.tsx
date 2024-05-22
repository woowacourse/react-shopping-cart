import { useRecoilValue } from "recoil";
import CartItem from "../../../common/CartItem/CartItem";
import { checkedCartItemsSelector } from "../../../../store/selector/selectors";

const OrderItemList = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

  return (
    <div>
      {checkedCartItems.map((item) => (
        <CartItem CartItemInfo={item} key={item.id} type="order" />
      ))}
    </div>
  );
};

export default OrderItemList;
