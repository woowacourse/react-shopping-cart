import styled from "@emotion/styled";
import { Header } from "../../components/common";
import CartLayout from "./cart-layout/CartLayout";

const ShoppingCartPage = () => {
  return (
    <>
      <Header title="Shop" />
      <CartLayout />
      <CheckoutButton>주문 확인</CheckoutButton>
    </>
  );
};

export default ShoppingCartPage;

const CheckoutButton = styled.button`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  &:hover {
    background-color: #555;
  }
`;
