import styled from "@emotion/styled";
import { getShoppingCartData } from "../../../../api/cart";
import { Flex } from "../../../../components/common";
import CheckboxLabel from "../../../../components/common/inputs/CheckboxLabel";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../context/OrderListProvider";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { calculateOrders } from "../../utils/calculateOrders";
import OrderLabelPridce from "../order-contents/OrderLabelPrice";

function DeliveryInfo() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, isIsland, handleIsIslandToggle } =
    useOrderListContext(cartListData);
  const { selectedCoupons } = useCouponContext();

  const { totalCartPrice, finalShippingFee, totalPrice, finalDiscount } =
    calculateOrders(selectedCartItems).getOrderPriceWithCoupon(
      selectedCoupons,
      isIsland
    );

  return (
    <Container alignItems="flex-start" gap="xs">
      <Title>배송 정보</Title>
      <CheckboxLabel isChecked={isIsland} onToggle={handleIsIslandToggle}>
        제주도 및 도서 산간 지역
      </CheckboxLabel>
      <OrderLabelPridce
        totalCartPrice={totalCartPrice}
        shippingFee={finalShippingFee}
        totalPrice={totalPrice}
        couponDiscount={-finalDiscount}
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
