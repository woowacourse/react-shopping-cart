import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getShoppingCartData } from "../../api/cart";
import { Header } from "../../components/common";
import { useAPIDataContext } from "../../context/APIDataProvider";
import CartLayout from "./cart-layout/CartLayout";
import { useOrderListContext } from "./context/OrderListProvider";

const ShoppingCartPage = () => {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectionMap } = useOrderListContext(cartListData);
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
    <>
      <Header left="SHOP" />
      <CartLayout />
      <CheckoutButton
        disabled={isDisabled}
        onClick={handleCheckout}
        role="order-button"
      >
        주문 확인
      </CheckoutButton>
    </>
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
