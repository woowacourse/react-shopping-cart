import { useRecoilValue } from "recoil";
import { checkedCartItemsSelector } from "../../../../store/selector/selectors";
import OrderItem from "../../../common/BasicCartItem/OrderItem";

const OrderItemList = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

  return (
    <div>
      {checkedCartItems.map((item) => (
        <OrderItem CartItemInfo={item} key={item.id} />
      ))}
    </div>
  );
};

export default OrderItemList;
