import styled from "@emotion/styled";
import OrderInfoTitle from "../../../domain/order/components/order-contents/OrderInfoTitle";
import OrderList from "../../../domain/order/components/order-contents/OrderList";
import { Flex } from "../../../components/common";

function OrderContents() {
  return (
    <Container justifyContent="flex-start">
      <OrderInfoTitle />
      <OrderList />
    </Container>
  );
}

export default OrderContents;

const Container = styled(Flex)`
  padding: 36px 24px;
`;
