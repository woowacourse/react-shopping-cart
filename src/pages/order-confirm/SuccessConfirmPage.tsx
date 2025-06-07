import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getShoppingCartData } from "../../api/cart";
import { Flex, Header } from "../../components/common";
import BackArrowButton from "../../components/common/BackArrowButton";
import { useAPIDataContext } from "../../context/APIDataProvider";
import { useOrderCalculation } from "../../hooks/order/useOrderCalculation";
import { formatKRWString } from "../../utils/formatKRWString";
import { useOrderListContext } from "../../context/OrderListProvider";

const SuccessConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data: cartListData } = useAPIDataContext({
    name: "cart",
    fetcher: getShoppingCartData,
  });
  const { selectionMap } = useOrderListContext(cartListData);
  const { typeCount, totalCount, totalPrice } = useOrderCalculation(
    cartListData,
    selectionMap
  );

  return (
    <>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <Container>
        <Flex justifyContent="center" alignItems="center" gap="lg">
          <InfoTitle>주문 확인</InfoTitle>
          <div>
            <Description
              aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
            >
              총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
            </Description>
            <Description>최종 결제 금액을 확인해 확인해 주세요.</Description>
          </div>
          <Subtitle>총 결제 금액</Subtitle>
          <InfoTitle
            aria-label={`총 결제 금액은 ${formatKRWString(totalPrice)} 입니다.`}
          >
            {formatKRWString(totalPrice)}
          </InfoTitle>
        </Flex>
      </Container>
      <PayButton isDisabled={true} disabled>
        결제하기
      </PayButton>
    </>
  );
};

export default SuccessConfirmPage;

const Container = styled(Flex)`
  padding: 36px 24px;
  height: calc(100vh - 116px);
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
`;

const PayButton = styled.button<{ isDisabled: boolean }>`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: ${({ isDisabled }) => (isDisabled ? "#BDBDBD" : "#333")};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 0px;
`;
