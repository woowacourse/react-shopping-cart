import styled from "@emotion/styled";
import { Flex } from "../../../../components/common";
import OrderInfoTitle from "./OrderInfoTitle";
import OrderList from "./OrderList";

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
