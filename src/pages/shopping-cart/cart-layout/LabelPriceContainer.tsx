import styled from "@emotion/styled";
import Flex from "../../../components/common/Flex";
import LabelPrice from "../../../components/common/LabelPrice";
import { useOrderListContext } from "../../../context/OrderListProvider";
import { formatKRWString } from "../../../utils/formatKRWString";
import { useAPIDataContext } from "../../../context/APIDataProvider";
import { getShoppingCartData } from "../../../api/cart";
import { useOrderCalculation } from "../../../hooks/order/useOrderCalculation";
import { FREE_SHIPPING_STANDARD } from "../../../hooks/order/OrderConstants";
import InfoText from "../../../components/common/InfoText";

const LabelPriceContainer = () => {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, isIsland, discount } = useOrderListContext(cartListData);
  const { shippingFee, totalPrice, totalCartPrice } = useOrderCalculation(
    selectedCartItems,
    isIsland,
    discount
  );

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const PriceWrapper = styled(Flex)`
  flex-direction: column;
  gap: 8px;
`;
