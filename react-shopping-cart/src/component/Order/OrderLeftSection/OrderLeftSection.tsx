import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";
import OrderItem from "../OrderItem/OrderItem";

import {
  selectCurrentOrders,
  selectOrdersLoading,
} from "redux/orders/orders.selector";
import { fetchOrdersStart } from "redux/orders/orders.action";
import {
  OrderLeftSectionHeader,
  OrderLeftSectionContainer,
} from "component/Order/OrderLeftSection/OrderLeftSection.style";

function OrderLeftSection() {
  const orders = useSelector(selectCurrentOrders);
  const dispatch = useDispatch();
  const loading = useSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, [dispatch]);

  return (
    <OrderLeftSectionContainer gap="30px">
      <OrderLeftSectionHeader>
        {`주문 상품 (${orders.length}건)`}
      </OrderLeftSectionHeader>
      <div style={{ width: "inherit" }}>
        <WithSpinner loading={loading}>
          {orders.map((order) => (
            <OrderItem {...order} key={order.id} />
          ))}
        </WithSpinner>
      </div>
    </OrderLeftSectionContainer>
  );
}

export default OrderLeftSection;
