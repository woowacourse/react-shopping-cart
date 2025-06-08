import styled from "@emotion/styled";
import { getShoppingCartData } from "../../../../api/cart";
import { Flex } from "../../../../components/common";
import CheckboxLabel from "../../../../components/common/CheckboxLabel";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../context/OrderListProvider";
import { useOrderCalculation } from "../../../../hooks/order/useOrderCalculation";
import OrderLabelPridce from "../OrderLabelPrice";

function DeliveryInfo() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, isIsland, handleIsIslandToggle, discount } =
    useOrderListContext(cartListData);

  const { totalCartPrice, shippingFee, totalPrice } = useOrderCalculation(
    cartListData,
    selectedCartItems,
    isIsland,
    discount
  );

  return (
    <Container alignItems="flex-start" gap="xs">
      <Title>배송 정보</Title>
      <CheckboxLabel isChecked={isIsland} onToggle={handleIsIslandToggle}>
        제주도 및 도서 산간 지역
      </CheckboxLabel>
      <OrderLabelPridce
        totalCartPrice={totalCartPrice}
        shippingFee={shippingFee}
        totalPrice={totalPrice}
        couponDiscount={discount}
      />
    </Container>
  );
}

export default DeliveryInfo;

const Container = styled(Flex)`
  padding: 20px 0;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
