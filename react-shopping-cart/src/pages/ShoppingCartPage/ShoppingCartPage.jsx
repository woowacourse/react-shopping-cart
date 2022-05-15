import CartLeftSection from "component/ShoppingCart/CartLeftSection/CartLeftSection";
import ExpectedPaymentContainer from "component/ShoppingCart/ExpectedPaymentContainer/ExpectedPaymentContainer";

import { ColumnFlexWrapper } from "styles/Wrapper";
import {
  ShoppingCartPageHeader,
  ShoppingCartPageContent,
} from "./ShoppingCartPage.style";

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
