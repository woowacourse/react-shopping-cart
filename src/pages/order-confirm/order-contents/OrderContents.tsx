import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import OrderInfoTitle from "./OrderInfoTitle";
import OrderList from "./OrderList";

function OrderContents({
  typeCount,
  totalCount,
}: {
  typeCount: number;
  totalCount: number;
}) {
  return (
    <Container justifyContent="flex-start">
      <OrderInfoTitle typeCount={typeCount} totalCount={totalCount} />
      <OrderList />
    </Container>
  );
}

export default OrderContents;

const Container = styled(Flex)`
  padding: 36px 24px;
`;
