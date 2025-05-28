import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import CartCheckList from "./cart-check-list/CartCheckList";
import CartTitle from "./cart-check-list/CartTitle";
import LabelPrice from "../../../components/common/LabelPrice";
import { useOrderListContext } from "../context/OrderListProvider";
import LabelPriceContainer from "./LabelPriceContainer";

const CartLayout = () => {
  return (
    <Container>
      <CartTitle />
      <CartCheckList />
      <LabelPriceContainer />
    </Container>
  );
};

export default CartLayout;

const Container = styled(Flex)`
  padding: 36px 24px;
`;
