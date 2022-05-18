import styled from "styled-components";

import { ColumnFlexWrapper } from "styles/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartsLoading,
  selectCurrentCarts,
} from "redux/carts/carts.selector";
import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";
import OrderItem from "../OrderItem/OrderItem";
import { useEffect } from "react";
import { fetchCartsStart } from "redux/carts/carts.action";

const OrderLeftSectionHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const OrderLeftSectionContainer = styled(ColumnFlexWrapper)`
  width: 490px;
  align-items: flex-start;
`;

function OrderLeftSection() {
  const carts = useSelector(selectCurrentCarts);
  const dispatch = useDispatch();
  const orderedCarts = carts.filter((cart) => cart.checked);
  const loading = useSelector(selectCartsLoading);

  useEffect(() => {
    dispatch(fetchCartsStart());
  }, [dispatch]);

  return (
    <OrderLeftSectionContainer gap="30px">
      <OrderLeftSectionHeader>
        {`주문 상품 (${orderedCarts.length}건)`}
      </OrderLeftSectionHeader>
      <div style={{ width: "inherit" }}>
        <WithSpinner loading={loading}>
          {orderedCarts.map((cart) => (
            <OrderItem {...cart} key={cart.id} />
          ))}
        </WithSpinner>
      </div>
    </OrderLeftSectionContainer>
  );
}

export default OrderLeftSection;
