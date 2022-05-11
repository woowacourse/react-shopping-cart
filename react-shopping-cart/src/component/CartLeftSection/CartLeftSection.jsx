import styled from "styled-components";
import { ColumnFlexWrapper } from "../../styles/Wrapper";
import AllSelectButton from "../AllSelectButton/AllSelectButton";
import ProductDeleteButton from "../ProductDeleteButton/ProductDeleteButton";
import ShoppingCartItemsContainer from "../ShoppingCartItemsContainer/ShoppingCartItemsContainer";

const CartLeftSectionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CartItemsContainerHeader = styled.div`
  font-size: 13px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid;
  border-color: ${({ theme }) => theme.colors["gray_01"]};
`;

function CartLeftSection() {
  return (
    <ColumnFlexWrapper width="490px">
      <CartLeftSectionHeader>
        <AllSelectButton />
        <ProductDeleteButton>상품삭제</ProductDeleteButton>
      </CartLeftSectionHeader>
      <div style={{ width: "inherit" }}>
        <CartItemsContainerHeader>든든배송 상품(3개)</CartItemsContainerHeader>
        <ShoppingCartItemsContainer />
      </div>
    </ColumnFlexWrapper>
  );
}

export default CartLeftSection;
