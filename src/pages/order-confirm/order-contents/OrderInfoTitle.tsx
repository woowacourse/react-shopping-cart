import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import { useAPIDataContext } from "../../../context/APIDataProvider";
import { getShoppingCartData } from "../../../api/cart";
import { useOrderListContext } from "../../../context/OrderListProvider";
import { useOrderCalculation } from "../../../hooks/order/useOrderCalculation";

function OrderInfoTitle() {
  const { data: cartListData } = useAPIDataContext({
    name: "cart",
    fetcher: getShoppingCartData,
  });
  const { selectedCartItems, isIsland, discount } = useOrderListContext(cartListData);
  const { typeCount, totalCount } = useOrderCalculation(
    selectedCartItems,
    isIsland,
    discount
  );
  return (
    <Flex justifyContent="flex-start" alignItems="flex-start" gap="xs">
      <InfoTitle>주문 확인</InfoTitle>
      <Description
        aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
      >
        총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
      </Description>
      <Description>최종 결제 금액을 확인해 확인해 주세요.</Description>
    </Flex>
  );
}

export default OrderInfoTitle;

const InfoTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const Description = styled.p`
  font-size: 14px;
  color: #888;
`;
