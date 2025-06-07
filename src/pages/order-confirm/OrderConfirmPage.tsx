import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getShoppingCartData } from "../../api/cart";
import { Flex, Header } from "../../components/common";
import BackArrowButton from "../../components/common/BackArrowButton";
import { useAPIDataContext } from "../../context/APIDataProvider";
import { useOrderListContext } from "../../context/OrderListProvider";
import { useOrderCalculation } from "../../hooks/order/useOrderCalculation";
import CouponModalButton from "./order-content/CouponModalButton";
import DeliveryInfo from "./order-content/DeliveryInfo";
import OrderInfoTitle from "./order-content/OrderInfoTitle";
import OrderList from "./order-content/OrderList";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data: cartListData } = useAPIDataContext({
    name: "cart",
    fetcher: getShoppingCartData,
  });
  const { selectionMap } = useOrderListContext(cartListData);
  const { typeCount, totalCount } = useOrderCalculation(
    cartListData,
    selectionMap
  );

  const navigateToSuccessPage = () => {
    navigate("/success-confirm");
  };

  return (
    <>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <Container justifyContent="flex-start">
        <OrderInfoTitle typeCount={typeCount} totalCount={totalCount} />
        <OrderList />
        <CouponModalButton />
        <DeliveryInfo />
      </Container>
      <PayButton onClick={navigateToSuccessPage} isDisabled={false}>
        결제하기
      </PayButton>
    </>
  );
};

export default OrderConfirmPage;

const Container = styled(Flex)`
  padding: 36px 24px;
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
