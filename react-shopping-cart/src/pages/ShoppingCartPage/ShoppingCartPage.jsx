import styled from "styled-components";
import CartLeftSection from "../../component/CartLeftSection/CartLeftSection";
import ExpectedPaymentContainer from "../../component/ExpectedPaymentContainer/ExpectedPaymentContainer";
import { ColumnFlexWrapper, RowFlexWrapper } from "../../styles/Wrapper";

const ShoppingCartPageHeader = styled.div`
  width: 880px;
  padding: 20px 0;
  border-bottom: 3px solid;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  border-bottom-color: ${({ theme }) => theme.colors["black_03"]};
`;

const ShoppingCartPageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ gap }) => gap};
`;

function ShoppingCartPage() {
  return (
    <ColumnFlexWrapper gap="30px">
      <ShoppingCartPageHeader>장바구니</ShoppingCartPageHeader>
      <ShoppingCartPageContent gap="60px">
        <CartLeftSection />
        <ExpectedPaymentContainer />
      </ShoppingCartPageContent>
    </ColumnFlexWrapper>
  );
}

export default ShoppingCartPage;
