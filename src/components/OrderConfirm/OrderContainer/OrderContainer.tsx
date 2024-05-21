import Checkbox from "../../Button/Checkbox/Checkbox";
import OrderItemList from "./OrderItemList/OrderItemList";

const OrderContainer = () => {
  return (
    <div>
      <OrderItemList />
      <button>쿠폰 적용</button>
      <div>배송 정보</div>
      <Checkbox isCheck={false} />
    </div>
  );
};

export default OrderContainer;
