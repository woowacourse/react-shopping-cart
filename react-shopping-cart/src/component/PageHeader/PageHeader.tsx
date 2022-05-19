import Header from "component/@shared/Header/Header";
import PageTitle from "component/@shared/PageTitle/PageTitle";
import NavigateButton from "component/@shared/NavigateButton/NavigateButton";

import { ReactComponent as Cart } from "assets/cart.svg";
import { RowFlexWrapper } from "styles/Wrapper";
import { ROUTE_PATH } from "constants/index";

function PageHeader() {
  return (
    <Header>
      <PageTitle to={ROUTE_PATH.ROOT}>
        <Cart />
        <div>ALMING SHOP</div>
      </PageTitle>
      <RowFlexWrapper gap="20px">
        <NavigateButton to={ROUTE_PATH.SHOPPING_CART}>장바구니</NavigateButton>
        <NavigateButton to={ROUTE_PATH.ORDER}>주문목록</NavigateButton>
      </RowFlexWrapper>
    </Header>
  );
}

export default PageHeader;
