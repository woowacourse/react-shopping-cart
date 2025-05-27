import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import CartCheckList from "./cart-check-list/CartCheckList";
import CartTitle from "./cart-check-list/CartTitle";

const CartLayout = () => {
  return (
    <Container>
      <CartTitle />
      <CartCheckList onCloseClick={() => {}} />
    </Container>
  );
};

export default CartLayout;

const Container = styled(Flex)`
  padding: 36px 24px;
`;
