import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import CartCheckList from "./cart-check-list/CartCheckList";
import CartTitle from "./cart-check-list/CartTitle";
import LabelPriceContainer from "./LabelPriceContainer";
import { useOrderListContext } from "../context/OrderListProvider";

const CartLayout = () => {
  const { cartListData } = useOrderListContext();

  return (
    <Container>
      <CartTitle />
      {cartListData && cartListData.length === 0 ? (
        <NoCartItem>장바구니에 아이템이 없습니다.</NoCartItem>
      ) : (
        <>
          <CartCheckList />
          <LabelPriceContainer />
        </>
      )}
    </Container>
  );
};

export default CartLayout;

const Container = styled(Flex)`
  padding: 36px 24px;
`;

const NoCartItem = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
