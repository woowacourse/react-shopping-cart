import styled from "@emotion/styled";
import { Header } from "../../components/common";
import CartLayout from "./cart-layout/CartLayout";
import { useOrderListContext } from "./context/OrderListProvider";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../../components/features/error-boundary/ErrorBoundary";

const ShoppingCartPage = () => {
  const { selectionMap } = useOrderListContext();
  const isDisabled = !Object.values(selectionMap).some(
    (isSelected) => isSelected
  );
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (!isDisabled) {
      navigate("/order-confirm");
    }
  };
  return (
    <ErrorBoundary>
      <Header left="SHOP" />
      <CartLayout />
      <CheckoutButton
        disabled={isDisabled}
        onClick={handleCheckout}
        role="order-button"
      >
        주문 확인
      </CheckoutButton>
    </ErrorBoundary>
  );
};

export default ShoppingCartPage;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;
