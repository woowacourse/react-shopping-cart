import styled from "@emotion/styled";
import { getShoppingCartData } from "../../../../api/cart";
import Flex from "../../../../components/common/styled/Flex";
import InfoText from "../../../../components/common/text/InfoText";
import LabelPrice from "../../../../components/common/text/LabelPrice";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../order/context/OrderListProvider";
import { formatKRWString } from "../../../../utils/formatKRWString";
import { FREE_SHIPPING_STANDARD } from "../../../order/hooks/OrderConstants";
import { calculateOrders } from "../../../order/utils/calculateOrders";

const LabelPriceContainer = () => {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems } = useOrderListContext(cartListData);

  const { shippingFee, totalPrice, totalCartPrice } =
    calculateOrders(selectedCartItems).getBasicOrderPrice();

  const InfoTextContent = ` 총 주문 금액이 ${formatKRWString(
    FREE_SHIPPING_STANDARD
  )} 이상일 경우
          무료 배송됩니다.`;

  return (
    <Container>
      <InfoText contentText={InfoTextContent} />
      <PriceWrapper>
        <LabelPrice label="주문 금액" price={totalCartPrice} />
        <LabelPrice
          ariaLabel="shipping-fee"
          label="배송비"
          price={shippingFee}
        />
      </PriceWrapper>

      <LabelPrice label="총 결제 금액" price={totalPrice} />
    </Container>
  );
};

export default LabelPriceContainer;

const Container = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  height: 180px;
`;

const PriceWrapper = styled(Flex)`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 16px 0;
  gap: 16px;
`;
