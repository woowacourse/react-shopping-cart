import styled from "styled-components";

import { ColumnFlexWrapper } from "styles/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";
import OrderItem from "../OrderItem/OrderItem";
import { useEffect } from "react";
import {
  selectCurrentOrders,
  selectOrdersLoading,
} from "redux/orders/orders.selector";
import { fetchOrdersStart } from "redux/orders/orders.action";

const OrderLeftSectionHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const OrderLeftSectionContainer = styled(ColumnFlexWrapper)`
  width: 490px;
  align-items: flex-start;
`;

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
